module.exports = class Interpreter {
    constructor(ins) {
        this.index = 0
        this.acc = 0
        this.ins = ins.split('\n').map(c => {
            let [code, ...args] = c.split(' ')
            return [code, ...args]
        })
        this.counter = new Array(this.ins.length).fill(0)
    }

    run() {
        while(this.step());
        return {acc: this.acc, index: this.index}
    }

    step() {
        if(!this.ins[this.index])
            return false
        let [code, ...args] = this.ins[this.index]
        if(this.counter[this.index]++ == 1)
            return false
        switch(code) {
            case "jmp":
                this.index += +args[0]
                break
            case "acc":
                this.acc += +args[0]
                this.index++
                break
            case "nop":
                this.index++
                break
        }

        return true
    }
}