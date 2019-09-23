(function(){
    function MainPromise(callback){

        if(typeof callback !== 'function'){
            return console.error('Аргументом была передана не функция')
        }

        this.runningProcess = false;
        this.runQueue = [];

        this.resolve = function(data) {
            if (!this.runningProcess) {
                this.runningProcess = true;
                this.thenChain.forEach(function(item) {
                    data = item(data);
                })
            }
        }.bind(this)
        this.reject = function(error) { 
            if (!this.runningProcess) {
                this.runningProcess = true;
                this.caught(error);
            }
        }.bind(this)

        setTimeout(function(){
            try{
                callback(this.resolve, this.reject)
            } catch(error){
                this.reject(error)
            }

        }.bind(this), 0)

        this.then = function(funcThen){
            this.runQueue.push(funcThen)
        }.bind(this)

    }
    if(window.Promise === undefined){
        window.MainPromise = MainPromise;
    }
})()