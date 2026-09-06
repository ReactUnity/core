# Builds `yoga` -- the native library com.reactunity.core P/Invokes into for layout.
#
# One library per platform, exporting Yoga's C API (`YG*`). That is the whole
# surface: unity/core/Runtime/Yoga/Native.cs declares 132 DllImports against it and
# nothing else crosses. Yoga's Java, JNI and embind bindings are deliberately not
# built -- see README.md, "What this does not build".
#
#   cmake -B build -S . -A x64
#   cmake --build build --config Release
#
# Yoga is fetched, never vendored, and pinned to a commit rather than a branch.
# The fork carries nothing but the layout fix; every build change it used to carry is
# set below instead. See README.md, "What the fork is for".

cmake_minimum_required(VERSION 3.20)
project(reactunity-yoga LANGUAGES CXX)

# The SHA rather than a branch name is what is pinned, because a branch moves and a
# SHA cannot -- and the question this whole directory exists to answer is "which Yoga
# is that binary?". `reactunity` is upstream `main` plus one commit, the fix for
# ReactUnity/core#89; rebase it onto a newer upstream to move this pin forward.
set(YOGA_REPOSITORY "https://github.com/ReactUnity/yoga.git" CACHE STRING "yoga remote")
set(YOGA_COMMIT "6a179416a7972ab1e69af89e7254cb4e3be23cf4" CACHE STRING "pinned yoga commit (reactunity)")

include(FetchContent)

FetchContent_Declare(yoga
    GIT_REPOSITORY ${YOGA_REPOSITORY}
    GIT_TAG ${YOGA_COMMIT}
    GIT_SHALLOW FALSE
)
# Populate without configuring. Yoga's own CMakeLists would drag in
# cmake/project-defaults.cmake, whose `-Werror` fails the build on any compiler
# newer than the one it was written against -- which is a reasonable default for
# developing Yoga and a bad one for a release pipeline that must keep working.
# Defining the target here instead is also what lets the fork stop carrying build
# patches: everything the fork's own build.yml needed a patch for is set below.
FetchContent_Populate(yoga)

file(GLOB YOGA_SOURCES CONFIGURE_DEPENDS
    ${yoga_SOURCE_DIR}/yoga/*.cpp
    ${yoga_SOURCE_DIR}/yoga/**/*.cpp)

if(NOT YOGA_SOURCES)
    message(FATAL_ERROR "no sources under ${yoga_SOURCE_DIR}/yoga -- did the fetch fail?")
endif()

# Static where the platform links the library into the player rather than loading it:
# Unity's iOS build links the archive into the generated Xcode project, and Emscripten
# links it into the WebGL module. Both make Native.cs bind against "__Internal".
if(IOS OR EMSCRIPTEN)
    add_library(yoga STATIC ${YOGA_SOURCES})
else()
    add_library(yoga SHARED ${YOGA_SOURCES})
endif()

# Unity loads the library by file name, so the name is part of the contract:
# Native.cs has `DllName = "yoga"`.
set_target_properties(yoga PROPERTIES
    OUTPUT_NAME yoga
    CXX_STANDARD 20
    CXX_STANDARD_REQUIRED ON
    POSITION_INDEPENDENT_CODE ON
    # Only YG_EXPORT escapes. Without this the .so also exports every internal
    # facebook::yoga symbol, which is what makes a 400 KB library out of a 90 KB one.
    CXX_VISIBILITY_PRESET hidden
    VISIBILITY_INLINES_HIDDEN ON)

target_include_directories(yoga PUBLIC ${yoga_SOURCE_DIR})

if(MSVC)
    # YGMacros.h resolves YG_EXPORT to __declspec(dllexport) under _WINDLL and to
    # nothing at all otherwise, so on MSVC this define is the difference between a
    # DLL with 398 exports and one with none. CMake happens to set it for SHARED
    # targets, but a build this load-bearing should not depend on that.
    target_compile_definitions(yoga PRIVATE _WINDLL)
    # C4251 is "needs to have dll-interface to be used by clients", 180 times over --
    # every std:: member of an exported C++ class. Nothing links against Yoga's C++
    # classes across this boundary; Unity P/Invokes the C API and nothing else.
    target_compile_options(yoga PRIVATE /EHsc /Oy- /W4 /wd4251 $<$<CONFIG:Release>:/O2>)
else()
    target_compile_options(yoga PRIVATE
        -fno-omit-frame-pointer -fexceptions -Wall
        $<$<CONFIG:Release>:-O2 -ffunction-sections -fdata-sections>)
endif()

# Yoga logs through <android/log> when building for Android.
if(ANDROID)
    target_link_libraries(yoga PRIVATE log)
endif()
