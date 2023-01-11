const {sendHook} = require('../Notify/sendHook.js')
const {
    processes: getProcesses, processes
} = require("systeminformation");

async function sniffCheck() {

    /*
    This function is in charge of sniffing the network. It will
    repeat every other millisecond to assure safety.
    */

    const securityType = "Sniff";

    //List of prohibeted processes.
    const filter = [
        "fiddler.exe", "fiddler everywhere",
        "tcpview.exe", "smsniff.exe",
        "socketsniff.exe", "charles.exe",
        "mitmweb.exe", "mitmdump.exe",
        "burpsuite.exe", "burp.exe",
        "fiddle everywhere.exe", "ghidra.exe",
        "fiddle.exe", "wireshark.exe", "ilspy.exe",
    ];
    const processes = await getProcesses();
    //Grabbing all processes
    for (let i = 0; processes.list.length > i; i++) {
        if (filter.includes(processes.list[i].name.toLowerCase())) {
            /*
            For each illigal process, one webhook will be sent with the sniff 
            parameter. When this happens, the user will be terminated. 
            */
            await sendHook(securityType);
            if (credentials.license) {
                await deleteKey(credentials.license)
            }
            sleep(2000);
            process.exit();
        }
    }
    //Sleeping before retrying again
    setTimeout(function() {
        return sniffCheck();
    }, 2000);
}

module.exports = {sniffCheck}