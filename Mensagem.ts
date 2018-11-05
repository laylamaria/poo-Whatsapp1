import {Usuario} from "./Usuario";

export class Mensagem{
    private emissor: Usuario;
    private texto: string;

    public constructor (emissor:Usuario , texto: string ){
        this.emissor=emissor;
        this.texto=texto;
    }
    public toString():string{
        let res:string = "[";
        res += this.emissor.getNome() +  " : " + this.texto + " ]";
        return res;
    }
    public getEmissor():Usuario{
        return this.emissor;
    }

    public getMsg():string{
         return this.texto;
    }

    
}