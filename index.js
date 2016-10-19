/* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

This content is released under the MIT License.
http://opensource.org/licenses/MIT
*/

var path = require('path');
var util = require('util');
var DailyRotateFile = require('winston-daily-rotate-file').DailyRotateFile;
var stackTrace = require('stack-trace');


var DconsoleDailyRotateFile = module.exports = function(arguments) {
   this.super_.apply(this, arguments);
}

util.inherits(DconsoleDailyRotateFile, DailyRotateFile);

function traceCaller() {
    var trace = stackTrace.get(DailyRotateFile.prototype.log);

    console.log ("ZZZZZZZZZZZZZZZZZZ here in tracecaller ZZZZZZ " + trace)

    if (trace.length >= 7) {
        var functionName = trace[5].getFunctionName() || "",
            fileName = trace[5].getFileName() || "";

        if ((functionName.indexOf("target") == 0 && fileName.indexOf("common.js") > 0) ||
                (functionName.indexOf("winston") == 0 && fileName.indexOf("winston.js") > 0)) {
            return trace [6]
        }
        else {
            return trace [5]
        }
    }
    return null;
}



DconsoleDailyRotateFile.prototype.log = function (level, msg, meta, callback) {
    var orgLabel = this.label;
    var trace = traceCaller();
    var traceStr = "";
    if (trace !== null) {
        traceStr = path.basename(trace.getFileName()) + ":" + trace.getLineNumber() + ":" + trace.getColumnNumber();
    }
    if (this.label === null || orgLabel === (traceStr.substr(0, traceStr.lastIndexOf('.')) || "error")) {
        this.label = traceStr;
    }
    else {
        this.label = orgLabel + ', ' + traceStr;
    }
    if (this.highlightLabel) {
        this.label = this.label.red;
    }
    DconsoleDailyRotateFile.super_.prototype.log.call(this, level, msg, meta, callback);
    this.label = orgLabel;
};



