import {Mensagem} from "./Mensagem";

export class Usuario{
    private nome: string ;
    private mensagens: Array<Mensagem>;

    public constructor (nome:string){
        this.nome=nome;
        this.mensagens=[];
    }

    public getNome():string{
        return this.nome;
    }

    public inserirMsg(msg:Mensagem):void{
        this.mensagens.push(msg);
        return;
    }
    public lerMsg():void{
        if(this.mensagens.length == 0){
            console.log("Mensagens ja foram lidas!");
            return;
        }
        for(let i of this.mensagens){
            if(this.nome != i.getEmissor().getNome()){
                console.log(i.toString());
            }
        }
        this.mensagens = [];
        return;
    }


}