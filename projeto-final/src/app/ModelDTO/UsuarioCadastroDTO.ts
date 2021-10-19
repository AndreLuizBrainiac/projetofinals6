export class UsuarioCadastroDTO {

    nome: string | undefined;
    email: string | undefined;
    confirmarEmail: string | undefined;
    senha: string | undefined;
    documento: string | undefined;
    tel: string | undefined;

    endereco: {
        
        cep: string | undefined;
        numero: string | undefined;
        complemento: string | undefined;
        rua: string | undefined;
        bairro: string | undefined;
        cidade: string | undefined;
        estado: string | undefined;
    } | undefined;
    
    termos: boolean | undefined;
}