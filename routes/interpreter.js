
var { BFInterpreter } = require('../build/bfinterpreter.js');
var { Memory, MemoryBlockSizes, SignedMemory} = require('../build/memory.js');
var Context = require('../build/executioncontext.js');

var express = require('express');
var router = express.Router();

//Check for minimum viable payload.
router.use((req, res, next) => {
    if (!req.body || !req.body.code)
    {
        res.status(400).send('<p>Bad request bruh. RTFM.</p>');
        return;
    }
    next();
});

//Set default compilerOptions if none were supplied.
router.use((req, res, next) => {
    if (!req.body.compilerOptions)
    {
        req.body.compilerOptions = {
            "signedMemory": false,
            "enableDebug": false,
            "blockSize": MemoryBlockSizes.Char,
            "blockCount": 32
        };
    }
    next();
})

router.post('/', (req, res, next) => {
    let options = req.body.compilerOptions;
    let memory = 
        options.signedMemory ? 
            new SignedMemory(options.blockCount, options.blockSize)
            : new Memory(options.blockCount, options.blockSize);
    let interpreter = new BFInterpreter(memory, new Context.OutputStream(false));
    let input = 
        req.body.input ?
            new Context.InputStream(req.body.input)
            : new Context.InputStream('');
    let { Output: output, Debug: debug} = interpreter.Execute(req.body.code, input);

    let result = { output: output.GetString() };
    if (options.enableDebug)
        result['debugInfo'] = debug.AsArray();
    
    res.status(200).json(result);
});

module.exports = router;