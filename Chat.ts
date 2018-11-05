import {Usuario} from "./Usuario";
import { Mensagem } from "./Mensagem";

export class Chat{
    private nome: string ;
    private usuarios: Array<Usuario>;
    public constructor (nome:string){
        this.nome=nome;
        this.usuarios=[];
    }

    public getNome():string{
        return this.nome;
    }

    public addUser(user:Usuario):void{
        this.usuarios.push(user);
    } 

    public buscarUser (nome:string): Usuario|undefined { 
        for (let i of this.usuarios){
            if (nome==i.getNome()){
                return i;
            }
        }
        return undefined;
    }
    public toString():string{
        let tostr:string= "";
        tostr += "[";
        for (let i of this.usuarios){
           tostr += i.getNome() + " ";
        }
        tostr += "]";
        return tostr;
    }

    public buscarindiceUser (nome:string): string|undefined { 
        for (let i in this.usuarios){
            if (nome==this.usuarios[i].getNome()){
                return i;
            }
        }
        return undefined;
    }

    public removeUser(nome:string):void{
        let r:string = this.buscarindiceUser(nome);
        this.usuarios.splice(parseInt(r),1);
        return;
    }

    public zap(nome:string,txt:string):void{
        let msg: Mensagem = new Mensagem(this.buscarUser(nome),txt);
        for(let i in this.usuarios){
            this.usuarios[i].inserirMsg(msg);
        }
        return;
    }

    public ler(nome:string):void{
        this.usuarios[this.buscarindiceUser(nome)].lerMsg();
        return;
    }



}