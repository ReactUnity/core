var mockFn = function () { };
var ErrorOverlay = {
  startReportingRuntimeErrors: mockFn,
  stopReportingRuntimeErrors: mockFn,
  reportBuildError: mockFn,
  dismissBuildError: mockFn,
};

module.exports = ErrorOverlay;
