# Builds `quickjs` -- the native library com.reactunity.quickjs P/Invokes into.
#
# One shared library exporting two things: quickjs-ng's own JS_* API, and the
# JSB_*/jsb_* shim in src/ that the C# layer needs because most of what it wants
# is either `static inline` in quickjs.h or variadic, and neither is reachable
# from P/Invoke.
#
# quickjs-ng is fetched, never vendored, and pinned to a commit rather than a
# branch. The pin is a fork because the async module loader is not upstream yet
# -- see MIGRATION.md.
#
#   cmake -B build -S . -G "Visual Studio 17 2022" -A x64
#   cmake --build build --config Release --target quickjs
#
# Build only the `quickjs` target: quickjs-ng adds its own test executables
# unconditionally and a default build would compile all of them.

cmake_minimum_required(VERSION 3.20)
project(reactunity-quickjs LANGUAGES C)

set(QJS_REPOSITORY "https://github.com/gkurt/quickjs.git" CACHE STRING "quickjs-ng remote")
set(QJS_COMMIT "ebd53d9542090e027f6c73bae8c3fd8c2ae9f1d5" CACHE STRING "pinned quickjs-ng commit")

include(FetchContent)

# Static: the JS_* symbols are re-exported from our DLL instead, so there is one
# binary to ship per platform rather than two.
set(BUILD_SHARED_LIBS OFF CACHE BOOL "" FORCE)
set(QJS_ENABLE_INSTALL OFF CACHE BOOL "" FORCE)
set(QJS_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
set(QJS_BUILD_LIBC OFF CACHE BOOL "" FORCE)

FetchContent_Declare(quickjs
    GIT_REPOSITORY ${QJS_REPOSITORY}
    GIT_TAG ${QJS_COMMIT}
    GIT_SHALLOW FALSE
)
FetchContent_MakeAvailable(quickjs)

# `BUILDING_QJS_SHARED` on a static target is deliberate. It turns JS_EXTERN into
# dllexport / visibility("default"), and both survive into the DLL that links the
# archive -- which is what re-exports quickjs-ng's API under our single library.
target_compile_definitions(qjs PUBLIC BUILDING_QJS_SHARED)
set_property(TARGET qjs PROPERTY POSITION_INDEPENDENT_CODE ON)

if(IOS)
    add_library(quickjs STATIC src/unity_qjs.c)
elseif(APPLE)
    add_library(quickjs MODULE src/unity_qjs.c)
    set_target_properties(quickjs PROPERTIES BUNDLE TRUE MACOSX_BUNDLE TRUE)
else()
    add_library(quickjs SHARED src/unity_qjs.c)
endif()

# Unity loads these by file name, so the name is part of the contract:
# JSApi.JSBDLL is "quickjs".
set_target_properties(quickjs PROPERTIES OUTPUT_NAME quickjs C_VISIBILITY_PRESET default)

target_link_libraries(quickjs PRIVATE qjs)

# quickjs-atom.h is not an installed header -- the shim includes it to get the
# predefined atom enum, so it needs the source tree, not just the public API.
target_include_directories(quickjs PRIVATE ${quickjs_SOURCE_DIR} src)

if(WIN32)
    target_compile_definitions(quickjs PRIVATE JS_EXPORT=__declspec\(dllexport\))
else()
    target_compile_definitions(quickjs PRIVATE "JS_EXPORT=__attribute__((visibility(\"default\")))")
endif()

if(MSVC)
    target_compile_options(quickjs PRIVATE /wd4146 /wd4703)
    target_compile_definitions(quickjs PRIVATE _CRT_SECURE_NO_WARNINGS)
endif()

# Runs the shim against ng in-process, checking the things a successful link cannot:
# the atom ids, and the bridge payloads under ng's stricter JS_SetOpaque. It compiles
# the shim rather than loading the library, so JS_EXPORT stays empty here.
enable_testing()
add_executable(shim-test src/shim_test.c)
target_link_libraries(shim-test PRIVATE qjs)
target_include_directories(shim-test PRIVATE ${quickjs_SOURCE_DIR} src)
if(MSVC)
    target_compile_options(shim-test PRIVATE /wd4146 /wd4703)
    target_compile_definitions(shim-test PRIVATE _CRT_SECURE_NO_WARNINGS)
endif()
add_test(NAME shim COMMAND shim-test)
