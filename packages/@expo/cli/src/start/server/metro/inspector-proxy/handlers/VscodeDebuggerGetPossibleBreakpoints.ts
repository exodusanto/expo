import Protocol from 'devtools-protocol';

import { CdpMessage, DebuggerRequest, DeviceResponse, InspectorHandler } from './types';
import { respond } from './utils';
import { ExpoDebuggerInfo } from '../device';

/**
 * Hermes doesn't seem to handle this request, but `locations` have to be returned.
 * Respond with an empty location to make it "spec compliant" with Chrome DevTools.
 */
export class VscodeDebuggerGetPossibleBreakpointsHandler implements InspectorHandler {
  onDebuggerMessage(
    message: DebuggerRequest<DebuggerGetPossibleBreakpoints>,
    { socket, debuggerType }: ExpoDebuggerInfo
  ): boolean {
    if (debuggerType === 'vscode' && message.method === 'Debugger.getPossibleBreakpoints') {
      return respond<DeviceResponse<DebuggerGetPossibleBreakpoints>>(socket, {
        id: message.id,
        result: { locations: [] },
      });
    }

    return false;
  }
}

/** @see https://chromedevtools.github.io/devtools-protocol/v8/Debugger/#method-getPossibleBreakpoints */
export type DebuggerGetPossibleBreakpoints = CdpMessage<
  'Debugger.getPossibleBreakpoints',
  Protocol.Debugger.GetPossibleBreakpointsRequest,
  Protocol.Debugger.GetPossibleBreakpointsResponse
>;
