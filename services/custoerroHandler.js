class custoerroHandler extends Error{
    constructor(status,msg){
        super();
        this.status = status;
        this.message = msg;
    }

    static orinalmess(message){
        return new custoerroHandler(555,message);
    }

    static alreadyExist(message){
        return new custoerroHandler(409,message);
    }

    static wrongCredentials(message = 'username or password is wrong!'){
        return new custoerroHandler(401,message);
    }


    static unauthorization(message = 'unauthorization!'){
        return new custoerroHandler(401,message);
    }

    static notFound(message = '404 NotFound!'){
        return new custoerroHandler(404,message);
    }




}

export default custoerroHandler;