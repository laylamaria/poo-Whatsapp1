import {Usuario} from "./Usuario";
import {Chat} from "./Chat";

declare function require(name:string):any;
var readline=require('readline-sync');

export class Controlador{
    private usuarios: Array<Usuario>;
    private chats: Array<Chat>;

    public constructor(){
        this.usuarios=[];
        this.chats=[];
    }

    public iniciar():void{
        while (true){
            let opc:string = "" +
            "------------------------------------------------" +
            "OPÇOES:\n" +
            "- addUser\n" +
            "- addChat\n" +
            "- allUsers\n" +
            "- chats\n" +
            "- invite\n" +
            "- users\n" +
            "- leave\n" +
            "- zap\n" +
            "- ler\n" +
            "- parar\n" ;
            console.log(opc);
            opc=readline.question("Digite a opcao: ");
            if (opc=="parar"){
                console.log("Ate a proxima!");
                break;
            }
            let nome: string;
            let nomegrupo:string;
            let convidado:string;
            let criadorgrupo: Usuario|undefined;
            switch(opc){
                
                case "addUser":
                nome = readline.question ("Digite seu nome: ");
                let novouser : Usuario = new Usuario(nome);
                this.usuarios.push(novouser);
                console.log("Usuario adicionado no Whatsapp!");
                break;

                case "addChat":
                nome = readline.question ("Digite seu nome: ");
                criadorgrupo = this.buscarUser(nome);
                if (criadorgrupo == undefined){
                    console.log(" Usuario nao encontrado. ");
                
                }else{
                    nomegrupo = readline.question ("Digite o nome do grupo: ");
                    let grupocriado: Chat|undefined = this.buscarChat(nomegrupo);
                    if (grupocriado == undefined){
                        let novogrupo : Chat = new Chat (nomegrupo);
                        novogrupo.addUser(criadorgrupo);
                        this.chats.push(novogrupo);
                        console.log("Grupo criado!");
                    }else{
                        console.log("Este grupo já existe!");
                    }     
                }
                break;

                case "allUsers":
                for (let i of this.usuarios){
                    console.log(i.getNome());
                }
                break;

                case "chats":
                nome = readline.question ("Digite seu nome: ");
                criadorgrupo = this.buscarUser(nome);
                if (criadorgrupo == undefined){
                    console.log("Usuario nao encontrado. ");
                    break;
                }
                let tostr:string= "[";
                for (let i of this.chats){
                    if (i.buscarUser(nome) != undefined){
                        tostr += i.getNome() + " ";
                    }
                }
                tostr += "]";
                console.log(tostr);
                break;
                
                case "invite":
                nome = readline.question ("Digite seu nome: ");
                let userdogrupo:Usuario|undefined = this.buscarUser(nome);
                if (userdogrupo == undefined){
                    console.log("Usuario do grupo nao encontrado. ");
                    break;
                }
                convidado = readline.question ("Digite o nome do convidado: ");
                let convidadogrupo:Usuario|undefined = this.buscarUser(convidado);
                if (convidadogrupo == undefined){
                    console.log("Convidado nao encontrado. ");
                    break;
                }
                nomegrupo = readline.question ("Digite o nome do grupo: ");
                let grupocriado: Chat|undefined = this.buscarChat(nomegrupo);
                if (grupocriado == undefined){
                    console.log("Este grupo nao existe!");
                    break;
                }else{
                    if(grupocriado.buscarUser(nome) == undefined){
                        console.log("Usuario nao esta no grupo. ");
                        break;
                    }else{
                        if(grupocriado.buscarUser(convidado) == undefined){
                            grupocriado.addUser(convidadogrupo);
                            this.chats[this.buscarindiceChat(nomegrupo)] = grupocriado;
                            console.log("Usuario adicionado. ");
                        }else{
                            console.log("Usuario ja adicionado neste grupo. ");
                        }
                    }
                }
                break;

                case "users":
                nomegrupo = readline.question ("Digite o nome do grupo: ");
                let grupo: Chat|undefined = this.buscarChat(nomegrupo);
                if (grupo == undefined){
                    console.log("Este grupo nao existe!");
                
                }else{
                    console.log(grupo.toString());
                }
                break;
                
                case "leave":
                nome = readline.question ("Digite o usuario a sair do grupo: ");
                let usergrupo:Usuario|undefined = this.buscarUser(nome);
                if (usergrupo == undefined){
                    console.log("Usuario do grupo nao encontrado. ");
                    break;
                }
                nomegrupo = readline.question ("Digite o nome do grupo: ");
                let grup: Chat|undefined = this.buscarChat(nomegrupo);
                if (grup == undefined){
                    console.log("Este grupo nao existe!");
                    break;
                }
                if(grup.buscarUser(nome) == undefined){
                    console.log("Usuario nao esta no grupo. ");
                    break;
                }
                this.chats[this.buscarindiceChat(nomegrupo)].removeUser(nome);
                console.log("Usuario removido do grupo. ");
                break;

                case "zap":
                nome = readline.question ("Digite seu nome: ");
                let pessoa = this.buscarUser(nome);
                if (pessoa == undefined){
                    console.log("Usuario nao encontrado.");
                    break;
                }
                nomegrupo = readline.question ("Digite o nome do grupo: ");
                let grupoo: Chat|undefined = this.buscarChat(nomegrupo);
                if (grupoo == undefined){
                    console.log("Este grupo nao existe!");
                    break;
                }
                if(grupoo.buscarUser(nome) == undefined){
                    console.log("Usuario nao esta no grupo. ");
                    break;
                }
                let txt:string = readline.question ("Digite a msg: ");
                grupoo.zap(nome,txt);
                console.log("Mensagem enviada!");
                break;
            
                case "ler":
                nome = readline.question ("Digite seu nome: ");
                let p = this.buscarUser(nome);
                if (p == undefined){
                    console.log("Usuario nao encontrado.");
                    break;
                }
                nomegrupo = readline.question ("Digite o nome do grupo: ");
                let g: Chat|undefined = this.buscarChat(nomegrupo);
                if (g == undefined){
                    console.log("Este grupo nao existe!");
                    break;
                }
                if(g.buscarUser(nome) == undefined){
                    console.log("Usuario nao esta no grupo. ");
                    break;
                }
                g.ler(nome);
                break;

                default:
                console.log("Comando inválido!");
            }
        }
    }
    
    public buscarUser (nome:string): Usuario|undefined { 
        for (let i of this.usuarios){
            if (nome==i.getNome()){
                return i;
            }
        }
        return undefined;
    }

    public buscarChat (nome:string): Chat|undefined { 
        for (let i of this.chats){
            if (nome==i.getNome()){
                return i;
            }
        }
        return undefined;
    }

    public buscarindiceChat (nome:string): string|undefined { 
        for (let i in this.chats){
            if (nome==this.chats[i].getNome()){
                return i;
            }
        }
        return undefined;
    }

}