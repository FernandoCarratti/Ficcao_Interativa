const prompt = require('prompt-sync')();
const color = require('colors');

let countVoltar = 0;
let countSinalRadio = 0;

inicio:
while (true){
    console.log();
    console.log(`...após 2 longos anos no espaço a tripulação da nave Axiom segue fazendo exploração e novas descobertas de planetas e civilizações a cada nova parada no espaço sideral.
algumas bem sucedidas, outras nem tanto, como a ultima vez em que pararam em um planeta e se depararam com uma guerra entre nações desse planeta.
Infelizmente muitas vidas foram perdidas, de ambos os lados da guerra e também de membros da tripulação da nave que acabaram
se envolvendo no conflito.

A partir de agora, por uma decisão estratégica, o capitão decidiu que ao invés de chegar aos próximos planetas com toda a aquipe,
ele enviaria um tripulante de baixa patente para fazer o reconhecimento da área antes de de descer com uma equipe inteira de exploração.

Após ser informado pelo sr. Ulrich de que estavam a apenas 2 dias de distância de um planeta ainda desconhecido, mas que pelos sensores,
era possível afirmar que era um planeta com possiveis formas de vida.

Neste mesmo instante o capitão mandou chamar um dos oficiais dos decks inferiores para informar sobre a missão de reconhecimento.`);

prompt('Pressione ENTER para continuar.')
console.clear();

console.log();
console.log('Capitão: Seja bem vindo a ponte de comando! Qual o seu nome? ');
console.log();

let jogador = prompt('Informe seu nome ao capitão: ');

console.log();
console.log('Capitão: muito bem... depois dos últimos acontecimentos, é melhor chama-lo apenas de recruta para não me apegar...');
console.log();
console.log('Recruta, a sua missão começa em 2 dias e você deverá descer ao planeta para confirmar se é seguro para o resto da equipe.');
console.log();
prompt(`Pressione ENTER para continuar.`);
console.clear();

const heroi ={
    nome: jogador,
    xp: 10,
    combustivel: 10,
    radio: 0,
    dias: 0,
    horas: 0,
    horasDescanso: 0,
    horasTrabalhadas: 0,
    pedras: [],
    materialOrganico: [],
    tempo: function(horas){
        let hora = horas + this.horas
        this.horas = hora
        if (this.horas >= 24){
            this.dias++;
            this.horas = hora - 24;
        }
    },
    dormir: function(descanso){
        if (this.horasTrabalhadas >= 18){
            console.log(`Você precisa descansar ou vai acabar desmaiando`);
            console.log();
            console.log(`[1] Descanse por 6 horas.`);
            console.log(`[2] Tentar seguir em frente sem descansar.`);
            console.log();
            descanso = +prompt(`Que tal armar acampamento e descansar um pouco: `);
            if (descanso == 1){
                console.log(`Você descansou por 6 horas. Já pode voltar ao trabalho.`)
                this.horas += 6;
                this.horasTrabalhadas = 0;
                if (this.xp > 9){
                this.xp += 1;
                }
                return true;
            }else if (descanso == 2){
                if (this.horasTrabalhadas >= 22){
                    heroi.desmaiar();
                }else{
                    return false;
                }
            }
        }   
    },
    desmaiar: function(){
        if (this.dormir != 1 && this.horasTrabalhadas > 20){
            console.log(`Você desmaiou! Não dá pra ficar alerta por tanto tempo sem descanso.`);
            prompt(`Pressione ENTER para retomar a missão.`);
            this.horas += 6;
            this.xp -= 1;
            return true;
        }
    },
    coletarPedras: function(pedra){
        this.pedras.push(pedra);
        if (this.pedras.length == 2){
            this.radio += 2.5;          
            this.pedras = [];
        }
    },
    coletarOrganico: function(organico){
        this.materialOrganico.push(organico);
        if (this.materialOrganico.length == 2){
            this.combustivel += 2.5;
            this.materialOrganico = [];
        }
    },
    morrer: function(){
        if (this.xp <= 0){
            return true;
        }else{
            return false;
        }
    }
}

function verificarStatus(){
    console.log(`${heroi.nome}`.cyan);
    if (heroi.xp > 10){
        heroi.xp = 10;
    }
    console.log(`Vida: ${heroi.xp * 10}%`.cyan);
    if (heroi.xp <= 4){
        console.log(`Se alimente e descanse ou você pode ter um desmaio e até mesmo morrer de fome.`.yellow)
    }
    if (heroi.combustivel > 10){
        heroi.combustivel = 10;
    }
    console.log(`Combustivel: ${heroi.combustivel * 10}%`.cyan);
    console.log(`Rádio: ${heroi.radio * 10}%`.cyan)
    console.log(`Tempo: ${heroi.dias} dias e ${heroi.horas} horas`.cyan);
    console.log(`Horas Trabalhadas: ${heroi.horasTrabalhadas}`.cyan);
    if (heroi.horasTrabalhadas >= 18){
        console.log(`O descanso é muito importante! Você já está trabalhando a ${heroi.horasTrabalhadas} horas sem parar.`.yellow)
    }
    
}

function inicioMissao(){
    console.log('[1] Aceitar a missão de primeira!');
    console.log('[2] Tentar argumentar com o capitão.');
    let opcao = +prompt('Digite a opção desejada para prosseguir no jogo: ');
    while (opcao != 1 && opcao != 2){
        opcao = +prompt('Digite uma opção válida para prosseguir no jogo: ');
    }
    
    if (opcao == 1){
        heroi.xp += 2;
        console.log(`capitão: Muito bem! Você tem 2 dias para se preparar. Está dispensado por enquanto!`);
        console.log();
        console.log(`Você ganhou 2 pontos extra de XP pela coragem!`);
    }else{
        heroi.xp -= 2;
        console.log(`Recruta: Mas capitão... Eu não sei se sou o mais indicado para este tipo de missão!`);
        console.log();
        console.log(`Capitão: Tenha coragem recruta! Em 2 dias você vai descer naquele planeta. Esteja preparado!`);  
        console.log();
        console.log(`Você perdeu 2 pontos de XP pela falta de coragem!`);      
    }
    heroi.dias += 2;
}

function verificarInimigo(){
    prompt(`Pressione ENTER para rolar os dados.`);
let dados = Math.ceil(Math.random() * 6);
if (dados > 3){
    return true;
}else{
    return false;
}
} 

let materialOrganico = 0;
function procurarCombustivel(){
    materialOrganico++
    if (materialOrganico == 1){
        console.log(`O melhor lugar para procurar por material orgânico decomposto parece ser um dos varios pântanos que é possivel ver no vale próximo de onde a nave caiu. Mas alguns perigos podem estar a sua frente.`);
        console.log();
        prompt('Pressione ENTER para recolher o composto orgânico.');
        console.log();
        console.log(`Ao chegar próximo a um dos pântanos, você se depara com pequenos animais de aparência até que "fofinha" em volta, mas logo que reparam a sua presença, se transformam em "pequenos demonios sanguinários".`);
        console.log();        
        console.log(`[1] Enfrentar uma orda de monstrengos.`);
        console.log(`[2] Voltar outra hora para ver se aqueles bichos já foram embora. `);
        console.log();
        let opcao = +prompt('Escolha uma opção para continuar: ');
        while (opcao != 1 && opcao != 2){
            opcao = +prompt('Escolha uma opção válida para continuar: ');
        }
        
        if(opcao == 1){
            console.log(`Para lutar contra os monstrengos você terá que tirar pelo menos 7 em 2 rodadas em um dado D20.`);
            console.log();

            let vitoriaJogador = 0;
            let vitoriaMonstrengo = 0;
            prompt();
            console.clear();
            
            for (let i = 1; i <= 3; i++){
                prompt('Pressione ENTER para jogar o dado.');                
                let dadoJogador = Math.ceil(Math.random() * 20);
                let dadoMonstrengo = Math.ceil(Math.random() * 20);
                if (dadoJogador >= 7 || dadoJogador > dadoMonstrengo){
                    vitoriaJogador++;
                }else{
                    vitoriaMonstrengo++;                    
                }     
                console.log();
                console.log(`Essa é a rodada ${i} você jogou ${dadoJogador} e o monstrengo jogou ${dadoMonstrengo}`);           
            }          
                         
            if (vitoriaJogador > vitoriaMonstrengo){
                console.log();
                console.log(`Você sacou o phaser e acertou uns 3 ou 4 desses bichos horrorosos. Isso já serviu de exemplo para os outros que fugiram assustados.`);
                console.log();
                console.log(`Você conseguiu recolher material orgânico para o preparo do combustivel, mas infelizmente você não consegue carregar tanto peso. Vai ser preciso 2 carregamentos para preparar 1 litro de combustível.`);
                console.log();
                console.log(`Você já pode voltar para a nave.`)
                heroi.tempo(6);
                heroi.horasTrabalhadas += 6;
                heroi.coletarOrganico(3);
                if (heroi.xp < 10){
                    heroi.xp += 1;     
                }                        
                return 3;
            }else{
                console.log();
                console.log(`Você sacou o phaser e chegou até a acertar alguns deles, mas isso não os intimidou e eles atacaram em massa.`);
                console.log();
                console.log(`Seu nome será lembrado para sempre entre o comando da Axiom!`);
                console.log();
                console.log(`Ou não...`);                
                console.log();
                console.log(`[1] Jogar novamente;`);
                console.log(`[2] Encerrar o jogo.`);
                console.log();                
                let opcao = +prompt(`Escolha uma das opções: `);
                while (opcao != 1 && opcao != 2){
                    opcao = +prompt('Escolha uma opção válida para continuar: ');
                }

                if (opcao == 1){                    
                    return 1;
                }else{
                    return 2;
                }
            }
            
        }else if (opcao == 2){
            heroi.tempo(3);
            heroi.horasTrabalhadas += 3;
            heroi.xp -= 2;
            console.log();
            console.log(`Você está de volta a nave, mas perdeu 2 pontos de XP pela falta de coragem!`);
        }
    }else{
        console.log(`Para pegar mais composto orgânico para a produção de combustivel você deve voltar a região dos pântanos.`);
        console.log();
        prompt('Pressione ENTER para recolher o composto orgânico.');
        console.log();
        console.log(`Apesar da aparencia "fofinha", aqueles animais são pequenos "demônios" e podem te atacar.`);
        console.log();
        let verificaInimigo = verificarInimigo();
        if (verificaInimigo == true){
        console.log(`[1] Enfrentar uma orda de monstrengos.`);
        console.log(`[2] Voltar outra hora para ver se aqueles bichos já foram embora. `);
        console.log();
        let opcao = +prompt('Escolha uma opção para continuar: ');
        while (opcao != 1 && opcao != 2){
            opcao = +prompt('Escolha uma opção válida para continuar: ');
        }
        
        if(opcao == 1){
            console.log(`Para lutar contra os monstrengos você terá que tirar pelo menos 7 em 2 rodadas em um dado D20.`);
            console.log();            

            let vitoriaJogador = 0;
            let vitoriaMonstrengo = 0;
            
            for (let i = 1; i <= 3; i++){
                prompt('Pressione ENTER para jogar o dado.');                
                let dadoJogador = Math.ceil(Math.random() * 20);
                let dadoMonstrengo = Math.ceil(Math.random() * 20);
                if (dadoJogador >= 7 || dadoJogador > dadoMonstrengo){
                    vitoriaJogador++;
                }else{
                    vitoriaMonstrengo++;                    
                }
                console.log();
                console.log(`Essa é a rodada ${i} você jogou ${dadoJogador} e o monstrengo jogou ${dadoMonstrengo}`);
            }     
            prompt('Pressione ENTER continuar.');
                console.clear();       
            if (vitoriaJogador > vitoriaMonstrengo){
                console.log();
                console.log(`Você sacou o phaser e acertou uns 3 ou 4 desses bichos horrorosos. Isso já serviu de exemplo para os outros que fugiram assustados.`);
                console.log();
                console.log(`Você conseguiu recolher material orgânico para o preparo do combustivel, mas infelizmente você não consegue carregar tanto peso. Vai ser preciso 2 carregamentos para preparar 1 litro de combustível.`);
                console.log();
                console.log(`Você já pode voltar para a nave.`)
                heroi.tempo(6);
                heroi.horasTrabalhadas += 6;
                heroi.coletarOrganico(3);
                if (heroi.xp < 10){
                heroi.xp += 1;     
                }                          
                return 3;
            }else{
                console.log();
                console.log(`Você sacou o phaser e chegou até a acertar alguns deles, mas isso não os intimidou e eles atacaram em massa.`);
                console.log();
                console.log(`Seu nome será lembrado para sempre entre o comando da Axiom!`);
                console.log();
                console.log(`Ou não...`);
                console.log();
                console.log(`[1] Jogar novamente;`);
                console.log(`[2] Encerrar o jogo.`);
                console.log();                
                
                let opcao = +prompt(`Escolha uma das opções: `);
                while (opcao != 1 && opcao != 2){
                    opcao = +prompt('Escolha uma opção válida para continuar: ');
                }

                if (opcao == 1){                    
                   return 1;
                }else{
                   return 2;
                }
            }            
        }else if (opcao == 2){
            heroi.tempo(3);
            heroi.horasTrabalhadas += 3;
            heroi.xp -= 2;
            console.log();
            console.log(`Você está de volta a nave, mas perdeu 2 pontos de XP pela falta de coragem!`); 
            console.log();           
        }
    }else{
        console.log(`Para pegar mais composto orgânico para a produção de combustivel você deve voltar a região dos pântanos.`);
        console.log();        
        console.log(`Apesar da aparencia "fofinha", aqueles animais são pequenos "demônios" e podem te atacar.`);
        console.log();
        prompt('Pressione ENTER para recolher o composto orgânico.');
        console.log();
        console.log(`Dessa vez você conseguiu recolher material orgânico tranquilo!`)
        console.log();
        console.log(`Aquelas criaturinhas asquerosas não estavam no pântano.`);
        heroi.tempo(4);
                heroi.horasTrabalhadas += 4;
                heroi.coletarOrganico(3);                                       
                return 3;
    }
    }
}
let pedras = 0;
function procurarMetal(){
    pedras++;
    if (pedras == 1){
        console.log();
        console.log(`Ao olhar para o horizonte você vê montanhas rochosas longinquas e percebe um brilho diferente nas rochas dessa cadeia de montanhas.

        Ao que tudo indica, as rochas são altamente minaralizadas e talvez você possa fazer a liga metalica para consertar a antena e finalmente conseguir se comunicar para padir ajuda ao comando da Axiom.
        
        Esse é um longo caminho e pode ter diversas ameaças. Mas se não tem tu, vai tu mesmo...
        
        É preciso completar a missão e sair desse planeta!
        
        Após uma longa caminhada, quando você se prepara para escalar a montanha, eis que sai de uma caverna próxima, uma criatura parecida com um grushteniak do planeta Skirvatzen e parte para o ataque.`);
        console.log();
        prompt();
        console.clear();
        console.log(`[1] Enfrentar o monstro.`);
        console.log(`[2] retornar para a nave e tentar voltar para as montanhas em outro momento.`);
        console.log();

        let opcao = +prompt('Escolha entre uma das opções para prosseguir: ');
        while (opcao != 1 && opcao != 2){
            opcao = +prompt('Escolha uma opção válida para continuar: ');
        }

        if (opcao == 1){
            prompt();
            console.clear();
            console.log(`Para lutar contra esse monstro você terá que tirar pelo menos 7 em 3 rodadas com um dado D20.`);
            console.log();

            let vitoriaJogador = 0;
            let vitoriaMonstro = 0;
            
            for (let i = 1; i <= 5; i++){
                prompt('Pressione ENTER para jogar o dado.')
                let dadoJogador = Math.ceil(Math.random() * 20);
                let dadoMonstro = Math.ceil(Math.random() * 20);
                if (dadoJogador >= 7 || dadoJogador > dadoMonstro){
                    vitoriaJogador++;
                }else{
                    vitoriaMonstro++;                    
                }
                console.log();
                console.log(`Essa é a rodada ${i} você jogou ${dadoJogador} e o monstro jogou ${dadoMonstro}`);
                }
                prompt();
            console.clear();
            if (vitoriaJogador > vitoriaMonstro){
                console.log();
                console.log(`Você sacou o phaser e ao acertar uma de suas longas pernas, percebeu que o monstro se desequilibrou. 
                A partir daí, ficou facil... Após quebrar 9 de suas 12 pernas, assim que o bicho foi ao chão você mirou todos os tiros em sua parte mais frágil e o monstro foi derrotado.`);
                console.log();
                console.log(`Você conseguiu subir a montanha e recolher o que conseguia carregar de rochas, mas ainda será preciso 2 vezes mais que isso para cada grama de metal necessário.`);
                console.log();
                console.log(`Ao sair daquela cadeia de montanhas você percebe que alguns pares de olhos ainda o espreitavam das profundezas da caverna...`)
                heroi.tempo(6);
                heroi.horasTrabalhadas += 6;
                heroi.coletarPedras(3);
                if (heroi.xp < 9){
                heroi.xp += 2;
                }
                return 3;
            }else{
                console.log();
                console.log(`Você sacou o phaser e até acertou alguns tiros, mas o monstro é muito rápido e uma de suas patas afiadas acabaram perfurando e arrancando a sua cabeça.`);
                console.log();
                console.log(`Seu nome será lembrado para sempre entre o comando da Axiom!`);
                console.log();
                console.log(`Ou não...`);
                console.log();
                console.log(`[1] Jogar novamente;`);
                console.log(`[2] Encerrar o jogo.`);
                console.log();
                
                let opcao = +prompt(`Escolha uma das opções: `);
                while (opcao != 1 && opcao != 2){
                    opcao = +prompt('Escolha uma opção válida para continuar: ');
                }

                if (opcao == 1){
                   return 1;
                }else{
                   return 2;
                }
            }
        }else if (opcao == 2){
            heroi.tempo(3);
            heroi.horasTrabalhadas += 3;
            heroi.xp -= 2;
            console.log();
            console.log(`Você está de volta a nave, mas perdeu 2 pontos de XP pela falta de coragem!`);
            prompt();
            console.clear();
        }
    }else{
        console.log();
        console.log(`Aparentemente essas criaturas nunca dormem. Por isso muito cuidado para conseguir escalar a montanha e não ser pego.`);
        console.log();
        let verificaInimigo = verificarInimigo();
        if (verificaInimigo == true){
        console.log(`[1] Enfrentar o monstro.`);
        console.log(`[2] retornar para a nave e tentar voltar para as montanhas em outro momento.`);
        console.log();

        let opcao = +prompt('Escolha entre uma das opções para prosseguir: ');
        while (opcao != 1 && opcao != 2){
            opcao = +prompt('Escolha uma opção válida para continuar: ');
        }
        prompt();
            console.clear();

        if (opcao == 1){
            console.log(`Para lutar contra esse monstro você terá que tirar pelo menos 7 em 3 rodadas com um dado D20.`);
            console.log();

            let vitoriaJogador = 0;
            let vitoriaMonstro = 0;
            
            for (let i = 1; i <= 5; i++){
                prompt('Pressione ENTER para jogar o dado.')
                let dadoJogador = Math.ceil(Math.random() * 20);
                let dadoMonstro = Math.ceil(Math.random() * 20);
                if (dadoJogador >= 7 || dadoJogador > dadoMonstro){
                    vitoriaJogador++;
                }else{
                    vitoriaMonstro++;                    
                }
                console.log();
                console.log(`Essa é a rodada ${i} você jogou ${dadoJogador} e o monstro jogou ${dadoMonstro}`);
                }
                prompt();
            console.clear();
            if (vitoriaJogador > vitoriaMonstro){
                console.log();
                console.log(`Você sacou o phaser e ao acertar uma de suas longas pernas, percebeu que o monstro se desequilibrou. 
                A partir daí, ficou facil... Após quebrar 9 de suas 12 pernas, assim que o bicho foi ao chão você mirou todos os tiros em sua parte mais frágil e o monstro foi derrotado.`);
                console.log();
                console.log(`Você conseguiu subir a montanha e recolher o que conseguia carregar de rochas, mas ainda será preciso 2 vezes mais que isso para cada grama de metal necessário.`);
                console.log();
                console.log(`Ao sair daquela cadeia de montanhas você percebe que alguns pares de olhos ainda o espreitavam das profundezas da caverna...`)
                heroi.tempo(6);
                heroi.horasTrabalhadas += 6;
                heroi.coletarPedras(3);
                if (heroi.xp < 9){
                heroi.xp += 2;
                }
                return 3;
            }else{
                console.log();
                console.log(`Você sacou o phaser e até acertou alguns tiros, mas o monstro é muito rápido e uma de suas patas afiadas acabaram perfurando e arrancando a sua cabeça.`);
                console.log();
                console.log(`Seu nome será lembrado para sempre entre o comando da Axiom!`);
                console.log();
                console.log(`Ou não...`);
                console.log();
                console.log(`[1] Jogar novamente;`);
                console.log(`[2] Encerrar o jogo.`);
                console.log();
                
                let opcao = +prompt(`Escolha uma das opções: `);
                while (opcao != 1 && opcao != 2){
                    opcao = +prompt('Escolha uma opção válida para continuar: ');
                }

                if (opcao == 1){
                   return 1;
                }else{
                   return 2;
                }
            }
        }else if (opcao == 2){
            heroi.tempo(3);
            heroi.horasTrabalhadas += 3;
            heroi.xp -= 2;
            console.log();
            console.log(`Você está de volta a nave, mas perdeu 2 pontos de XP pela falta de coragem!`);
            prompt();
            console.clear();
        }
    }else{
        console.log(`Aparentemente essas criaturas nunca dormem. Por isso muito cuidado para conseguir escalar a montanha e não ser pego.`);
        console.log();      
        prompt('Pressione ENTER para recolher o composto orgânico.');
        console.log();
        console.log(`Dessa vez você conseguiu recolher as rochas mais tranquilamente!`)
        console.log();
        console.log(`Aqueles monstros parecidos com um grushteniak de Skirvatzen não estavam acordados.`);
        heroi.tempo(4);
                heroi.horasTrabalhadas += 4;
                heroi.coletarOrganico(3);                                       
                return 3;
    }
    }
}

let countProcurarComida = 0;

function procurarComida(){
    countProcurarComida++
    if (countProcurarComida == 1){
        prompt();
            console.clear();
        console.log();
        console.log(`Após todo o stress da queda em um planeta inóspito e uma minuciosa verificação na nave para ter real noção do que precisa para se livrar dessa situação, completar a missão e retornar à Axiom, você com certeza está com muita fome.

        O seu traje possui um recurso que pode fazer a leitura do ambiente e detectar se existe algum componente venenoso no ambiente.
        
        Comer animais seria um risco muito grande pois além de venenosos, muito provavelmente são dificeis de caçar. Pode ser um esforço desnecessário.
        
        O melhor a se fazer é buscar por vegetais que podem ser facilmente verificados pelo traje.
        
        É possivel ver daqui uma grande área verde próximo ao pântano, talvez ali tenha alguma coisa comestível para suportar os desafios da missão.
        
        Ao chegar nessa floresta, enquanto você procura por alguma planta comestível é atacado por um animal que lembra um kharhide, um dos animais que você ouviu a descrição de um outro tripulante da Axiom quando esteve no planeta Aniara.
        
        Você se lavanta, mas não sabe o que fazer.`);
        console.log();
        console.log(`[1] Enfrentar o estranho animal.`);
        console.log(`[2] Retornar a nave e esperar um pouco antes de voltar a floresta. Quem sabe o bicho já foi embora.`);
        console.log();
        
        let opcao = +prompt(`Escolha entre uma das opções para prosseguir: `);
        while (opcao != 1 && opcao != 2){
            opcao = +prompt('Escolha uma opção válida para continuar: ');
        }
        console.clear();

        if (opcao == 1){
            console.log(`Para lutar contra o estranho animal você terá que tirar acima de 7 em 2 rodadas com um dado D20.`);
            console.log();

            let vitoriaJogador = 0;
            let vitoriaAnimal = 0;
            
            for (let i = 1; i <= 3; i++){
                prompt('Pressione ENTER para jogar o dado.')
                let dadoJogador = Math.ceil(Math.random() * 20);
                let dadoAnimal = Math.ceil(Math.random() * 20);
                if (dadoJogador >= 7 || dadoJogador > dadoAnimal){
                    vitoriaJogador++;
                }else{
                    vitoriaAnimal++;                    
                }
                console.log();
                console.log(`Essa é a rodada ${i} você jogou ${dadoJogador} e o estranho animal jogou ${dadoAnimal}`);
            }
            // prompt();
            // console.clear();
            if (vitoriaJogador > vitoriaAnimal){
                console.log();
                console.log(`Depois de alguns tiros o animal se assustou e saiu correndo ferido.`);
                console.log();
                console.log(`Você conseguiu encontrar algumas plantas para se alimentar e prosseguir em sua jornada de completar a missão e conseguir voltar para a Axiom.`);
                heroi.tempo(4);
                heroi.horasTrabalhadas += 4;
                if (heroi.xp < 10){
                heroi.xp += 1;
                }
            }else{
                if (heroi.xp > 3){
                    console.log();
                    console.log(`Você sacou o phaser e atirou algumas vezes mas a carapaça do animal é muito espessa e ele não para de te atacar. 

                    Antes que você morra é melhor voltar a nave e descansar um pouco antes de voltar a procurar comida.`);
                    console.log();
                    prompt('Pressione ENTER para retornar à nave e descansar.');
                    let retornar = 3
                    return retornar;
                }else{ 
                    console.log();
                    console.log(`A sua vida estava muito baixa e por isso você acabou morrendo por um ataque de baixo dano. Da próxima vez tente não ficar com tanta fome antes de ir buscar alimentos.`)           
                    console.log();
                    console.log(`Seu nome será lembrado para sempre entre o comando da Axiom!`);
                    console.log();
                    console.log(`Ou não...`);
                    console.log();
                    console.log(`[1] Jogar novamente;`);
                    console.log(`[2] Encerrar o jogo.`);
                    console.log();
                    
                    let opcao = +prompt(`Escolha uma das opções: `);
                    while (opcao != 1 && opcao != 2){
                        opcao = +prompt('Escolha uma opção válida para continuar: ');
                    }

                    if (opcao == 1){
                       return 1;
                    }else{
                        return 2;
                    }
                }
            }
        }else{
            heroi.tempo(3);
            heroi.horasTrabalhadas += 3;
            heroi.xp -= 2;
            console.log();
            console.log(`Você está de volta a nave, mas perdeu 2 pontos de XP pela falta de coragem!`);
        }
    }else{
        console.log(`Você precisa estar forte para sobreviver e conseguir voltar. A melhor forma é se alimentando, mas cuidado com aqueles animais estranhos!`);
        console.log();
        prompt('Pressione ENTER para procurar comida.');
        prompt();
            console.clear();
            let verificaInimigo = verificarInimigo();
        if (verificaInimigo == true){
        console.log(`Esses animais são duros na queda, mas também se assustam facilmente`);
        console.log();
        console.log(`[1] Enfrentar o animal estranho.`);
        console.log(`[2] Voltar outra hora para ver se o animal está mais calmo.`);
        console.log();
        let opcao = +prompt('Escolha uma opção para continuar: ');
        while (opcao != 1 && opcao != 2){
            opcao = +prompt('Escolha uma opção válida para continuar: ');
        }
        console.clear();
        if(opcao == 1){
            console.log(`Para lutar contra o estranho animal você terá que tirar acima de 7 em 2 rodadas com um dado D20.`);
            console.log();

            let vitoriaJogador = 0;
            let vitoriaAnimal = 0;
            
            for (let i = 1; i <= 3; i++){
                prompt('Pressione ENTER para jogar o dado.')
                let dadoJogador = Math.ceil(Math.random() * 20);
                let dadoAnimal = Math.ceil(Math.random() * 20);
                if (dadoJogador >= 7 || dadoJogador > dadoAnimal){
                    vitoriaJogador++;
                }else{
                    vitoriaAnimal++;                    
                }
                console.log();
                console.log(`Essa é a rodada ${i} você jogou ${dadoJogador} e o animal jogou ${dadoAnimal}`);
            }
            prompt();
            console.clear();
            if (vitoriaJogador > vitoriaAnimal){
                console.log();
                console.log(`Depois de alguns tiros o animal se assustou e saiu correndo ferido.`);
                console.log();
                console.log(`Você conseguiu encontrar algumas plantas para se alimentar e prosseguir em sua jornada de completar a missão e conseguir voltar para a Axiom.`);
                heroi.tempo(4);
                heroi.horasTrabalhadas += 4;
                if (heroi.xp < 10){
                heroi.xp += 1;
                }
            }else{
                if (heroi.xp > 3){
                    console.log();
                    console.log(`Você sacou o phaser e atirou algumas vezes mas a carapaça do animal é muito espessa e ele não para de te atacar. 

                    Antes que você morra é melhor voltar a nave e descansar um pouco antes de voltar a procurar comida.`);
                    console.log();
                    prompt('Pressione ENTER para retornar à nave e descansar.');
                    let retornar = 3
                    return retornar;
                }else{ 
                    console.log();
                    console.log(`A sua vida estava muito baixa e por isso você acabou morrendo por um ataque de baixo dano. Da próxima vez tente não ficar com tanta fome antes de ir buscar alimentos.`)           
                    console.log();
                    console.log(`Seu nome será lembrado para sempre entre o comando da Axiom!`);
                    console.log();
                    console.log(`Ou não...`);
                    console.log();
                    console.log(`[1] Jogar novamente;`);
                    console.log(`[2] Encerrar o jogo.`);
                    console.log();
                    
                    let opcao = +prompt(`Escolha uma das opções: `);
                    while (opcao != 1 && opcao != 2){
                        opcao = +prompt('Escolha uma opção válida para continuar: ');
                    }
                    console.clear();

                    if (opcao == 1){
                        return 1;
                    }else{
                        return 2;
                    }
                }    
            }            
        }else{
            heroi.tempo(3);
            heroi.horasTrabalhadas += 3;
            heroi.xp -= 2;
            console.log();
            console.log(`Você está de volta a nave, mas perdeu 2 pontos de XP pela falta de coragem!`);
        }
    }else{
        console.log(`Aparentemente aquele animal estranho não estava na floresta no momento que você foi procurar comida. Que bom!`);
        console.log();      
        prompt('Pressione ENTER para recolher o composto orgânico.');
        console.log();
        console.log(`Dessa vez você conseguiu se alimentar tranquilamente!`)
        console.log();
        console.log(`Aquele animal esquisito devia estar no ninho..`);
        heroi.tempo(4);
                heroi.horasTrabalhadas += 4;
                heroi.coletarOrganico(3);                                       
                return 3;
    }
    }
    }
}

function combustivelCheio(){
    if (heroi.combustivel >= 10){
        return true;
    }else{
        return false;
    }
}

function radioOK(){
    if (heroi.radio >= 10){
        return true;
    }else{
        return false;
    }
}

function vidaCheia(){
    if (heroi.xp >= 10){
        return true;
    }else{
        return false;
    }
}


console.log();
inicioMissao();
prompt('Pressione ENTER para continuar.');
console.clear();

console.log(`É chegado o memento da missão!`);
console.log();
prompt('Pressione ENTER para o lançamento.');
console.clear();

console.log(`Contagem regressiva para o lançamento...3...2...1...`);
console.log();
prompt('Pressione ENTER para continuar.');
console.log();

console.log(`O lançamento ocorreu de maneira tranquila.`);
console.log();
console.log(`Quando a nave começa a entrar na atmosfera é repentinamente atingida por algo. Todos os alarmes estão soando. Alerta! Alerta! Alert...`);
console.log();
prompt();
console.clear();


function ato1(){
        
    prompt('Pressione ENTER para acordar.');
    console.clear();

    console.log(`Recruta: urgh...aaahh... sabia que esta missão não daria certo...Mas pelo menos estou vivo!`);
    console.log();
    console.log(`Recruta: Vamos! Levante-se! Você precisa sobreviver!`);
    console.log();

    heroi.xp -= 5;
    heroi.combustivel = 0;
    heroi.tempo(4);
    console.log();
    verificaNave:
    while (true){
    console.log(`[1] Verificar o status da nave`);
    console.log(`[2] Chamar a tripulação de comando pelo rádio.`);
    console.log();
        
    let opcao = +prompt('Escolha uma das opções para prosseguir: ');
    while (opcao != 1 && opcao != 2){
        opcao = +prompt('Escolha uma opção válida para continuar: ');
    }
    console.clear();
        
    if (opcao == 1){
        heroi.tempo(2);
        console.log(`Assim que você sai da nave percebe que o solo está completamente encharcado. O combustivel da nave vazou com a queda, mas tudo bem! A nave é movida por um combustivel de composto biológico que deve ser relativamente facil de encontrar.`);
        console.log();
        console.log(`Ao olhar para o compartimento de suprimentos, percebe que ele não está mais lá, provavelmente deve ter se soltado durante a queda.`);
        console.log();
        console.log(`Mas o maior problema mesmo vai ser consertar a antena da nave para se comunicar, pois é preciso uma liga metalica muito especifica para fazer funcionar. Provavelmente vai ter que ser retirada de algum mineral e isso vai levar um bom tempo para ser feito.`);
        console.log();
        console.log(`Sem contar, que depois de todo este tempo, nosso recruta deve estar faminto. Mas desistir agora não é uma opção!`);
        console.log();
        prompt(`Pressione ENTER para prosseguir na missão`);
        break verificaNave;
            
       }else{
        console.log(`Recruta: Axiom... Axiom... Aqui é ${heroi.nome}.`);
        console.log();
        console.log(`Radio: sssshhhhh... ssshhhh...`);
        console.log();
        console.log(`Recruta: Alguém na escuta?`);
        console.log();
        console.log(`A antena deve estar danificada. Verifique o status da nave para saber sua situação.`);
        heroi.tempo(1);
        prompt(`Pressione ENTER para verificar o status da nave.`);
        continue verificaNave;
       }
}
}

ato1();
while (true){
    let heroiMorto = heroi.morrer();
    if (heroiMorto == true){
        console.log(`Você está morto!`.red);
        console.log(`Tente se alimentar mais antes de coletar os outros itens`);
        prompt(`Pressione ENTER para reiniciar.`);
        break inicio;
    }else{           
    const combustivel = combustivelCheio();
    const radio = radioOK();
    const vida = vidaCheia();

      
    if (combustivel == true && radio == true){   
            console.clear();     
            prompt('Pressione ENTER para ver quais são as suas opções para sobreviver e completar a missão com sucesso.');
            console.clear();
            console.log(`[1] Procurar material orgânico decomposto.`);
            console.log(`[2] Procurar rochas que contenham minerais para produzir a liga metálica da antena do rádio.`);
            console.log(`[3] Procurar comida.`);
            console.log(`[4] Verificar status.`);
            console.log(`[5] Concluir a missão e voltar à Axiom.`)
            console.log();
    
            let opcao = +prompt(`Escolha uma das opções para prosseguir: `);
            while (opcao != 1 && opcao != 2 && opcao != 3 && opcao != 4 && opcao != 5){
                opcao = +prompt('Escolha uma opção válida para continuar: ');
            }
    
            if (opcao == 1){
                let combustivel = procurarCombustivel();
                if (combustivel == 1){
                    continue;
                }else if (combustivel == 3){
                    if (heroi.horas >= 18){
                        let dormir = heroi.dormir();
                        if (dormir == true){               
                        continue
                        }
                    }else{            
                        prompt();
                        continue;
                    }
                }else if (combustivel == 2){
                    break;
                }
            }else if (opcao == 2){
                let metal = procurarMetal();
                if (metal == 1){
                    continue;  
                }else if(metal == 3){
                    if (heroi.horas >= 18){
                        let dormir = heroi.dormir();
                        if (dormir == true){               
                        continue
                        }
                    }else{            
                        prompt();
                        continue;
                    }
                }else if (metal == 2){
                    break;
                }
            }else if (opcao == 3){
                let comida = procurarComida();
                if (comida == 1){
                    continue;  
                }else if (comida == 3){
                    if (heroi.horas >= 18){
                        let dormir = heroi.dormir();
                        if (dormir == true){               
                        continue
                        }
                    }else{            
                        prompt();
                        continue;
                    }
                }else if (comida == 2){
                    break;
                }
            }else if (opcao == 4){
                verificarStatus();
                continue;
            }else if (opcao == 5){
                if (vida == true){
                    console.clear();
                    console.log(`Agora falta pouco!`);
                    console.log();
                    console.log(`Você já conseguiu consertar o rádio da nave, conseguiu colocar combustivel para retornar e sobreviveu a todos os perigos que este planeta colocou no seu caminho.`);
                    console.log();
                    console.log(`Durante sua jornada de sobrevivencia, você já completou sua missão de explorar o planeta.`);
                    prompt();
                    console.clear();
                    console.log(`O problema é que durante a noite você não vai ter visibilidade o suficiente para fazer decolagem.`);
                    console.log();
                    console.log(`Descanse um pouco e não se esqueça de se alimentar, pois a viagem de retorno dura 4 horas`);
                    prompt(`Pressione ENTER para descansar`);
                    heroi.tempo(6);
                    console.clear();
                    console.log(`Hora da decolagem!`);
                    console.log();
                    console.log(`Nem precisa de contagem regressiva...`);
                    prompt();
                    console.clear();
                    console.log(`Ufa! Você saiu do planeta e a viagem está indo bem!`);
                    prompt();
                    console.clear();
                    console.log(`Você chegou a Axiom e dessa vez foi muito bem recebido pela tripulação.`)
                    console.log();
                    console.log(`Capitão: Recruta! Seja bem vido de volta! Como foi a missão? Podemos estabelecer uma base por lá para coletar suprimentos?`);
                    console.log();
                    console.log(`Recruta: Apesar dos desafios, o planeta é habitavel sim, tem formas de vida, mas algumas delas são bem perigosas.`);
                    console.log();
                    console.log(`Capitão: Após essa missão e depois de tudo o que você passou, merece ser promovido de posto!`);
                    prompt();
                    console.clear();
                    console.log(`Capitão: Como é seu nome mesmo?`)
                    console.log();
                    console.log(heroi.nome);
                    console.log();
                    console.log(`capitão: Que seja, recruta... A partir desse momento, você passará a ser auxiliar do assiste de assuntos gerais da nave! Parabéns pela promoção!`)
                    console.log(`...cara de paisagem...`);
                    prompt();
                    console.clear();
                    console.log(`Recruta: Capitão, antes de assumir o meu novo posto, posso fazer uma pergunta ao senhor?`);
                    console.log();
                    console.log(`Capitão: Claro que pode recruta!`);
                    prompt();
                    console.clear();
                    console.log(`Recruta: Quando o senhor me chamou, perguntou meu nome, mas preferiu me chamar apenas de recruta para não se apegar por conta do que aconteceu antes. O senhor pode me contar o que aconteceu com o recruta anterior?`);
                    console.log();
                    console.log(`Capitão: Claro recruta!`);
                    prompt();
                    console.clear();
                    console.log(`Ele se casou, mudou de trabalho e nunca mais entrou em contato!`);
                    console.log();
                    console.log(`¯\_( ͡° ͜ʖ ͡°)_/¯`)
                    console.log();
                    prompt(`Pressione ENTER para continuar`);
                    console.clear();
                    console.log(`Escolha uma das opções para prosseguir.`);
                    console.log();
                    console.log(`[1] Jogar novamente.`);
                    console.log(`[2] Continuar.`)
                    let opcao = +prompt(`Digite a sua opção: `);
                    if (opcao == 1){
                        continue inicio;  
                    }else{
                        console.log(`Uma nova aventura virá em breve!`);
                        console.log();
                        console.log(`FIM`);
                        prompt(`Sair do jogo (ENTER).`);
                        break inicio;
                    }                
                }else{
                    console.clear();
                    console.log(`Você precisa estar bem alimentado. Está é uma viagem longa.`)
                    console.log();
                    prompt(`Pressione ENTER para coletar comida para a viagem.`)
                    continue; 
                }                
            } 
    }else if (combustivel == true && radio == false){
        countVoltar++;        
        if (countVoltar == 1){
        console.clear();
            prompt('Pressione ENTER para ver quais são as suas opções para sobreviver e completar a missão com sucesso.');
        console.clear();
        console.log(`[1] Procurar material orgânico decomposto.`);
        console.log(`[2] Procurar rochas que contenham minerais para produzir a liga metálica da antena do rádio.`);
        console.log(`[3] Procurar comida.`);
        console.log(`[4] Verificar status.`);
        console.log(`[5] Voltar a Axiom. (Combustível 100%)`)
        console.log();

        let opcao = +prompt(`Escolha uma das opções para prosseguir: `);
        while (opcao != 1 && opcao != 2 && opcao != 3 && opcao != 4 && opcao != 5){
            opcao = +prompt('Escolha uma opção válida para continuar: ');
        }

        if (opcao == 1){
            let combustivel = procurarCombustivel();
            if (combustivel == 1){
                continue;
            }else if (combustivel == 3){
                if (heroi.horasTrabalhadas >= 18){
                    let dormir = heroi.dormir();
                    if (dormir == true){  
                        prompt();             
                    continue
                    }
                }else{            
                    prompt();
                    continue;
                }
            }else if (combustivel == 2){
                break;
            }
        }else if (opcao == 2){
            let metal = procurarMetal();
            if (metal == 1){
                continue;  
            }else if(metal == 3){
                if (heroi.horasTrabalhadas >= 18){
                    let dormir = heroi.dormir();
                    if (dormir == true){  
                        prompt();             
                    continue
                    }
                }else{            
                    prompt();
                    continue;
                }
            }else if (metal == 2){
                break;
            }
        }else if (opcao == 3){
            let comida = procurarComida();
            if (comida == 1){
                continue;  
            }else if (comida == 3){
                if (heroi.horasTrabalhadas >= 18){
                    let dormir = heroi.dormir();
                    if (dormir == true){ 
                        prompt();              
                    continue
                    }
                }else{            
                    prompt();
                    continue;
                }
            }else if (comida == 2){
                break;
            }
        }else if (opcao == 4){
            verificarStatus();
            prompt();
            continue;
        }else if (opcao == 5){
            console.clear();
            console.log(`Parece que a nave já pode voar!`)
            console.log();
            console.log(`Você parte do planeta aos trancos e barrancos, mas finalmente consegue chegar à Axiom. Esperando uma volta calorosa por parte do comando da missão, o capitão apenas pegunta como era o planeta e porque estava de volta sem ao menos ter feito um contato pelo rádio antes.`);
            console.log();
            console.log(`recruta: Capitão, como o senhor já percebeu, a nave se acidentou e eu não tive como completar a missão!`);
            console.log();
            console.log(`capitão: Mas você voltou voando com ela, não voltou!? Pois se está tudo bem, trate de voltar ao planeta e completar a sua missão de exploração!`)
            console.log();
            console.log(`recruta: Mas capitão...`);
            console.log();
            console.log(`capitão: Ora recruta... veja pelo lado positivo! A nave ainda funciona e você está vivo! Finalize sua missão!`);
            console.log();
            console.log(`Você perdeu 4 horas de voo e gastou 20% de combustível`);
            prompt(`Pressione ENTER para finalizar a missão`);
            console.clear();
            heroi.tempo(4);
            heroi.combustivel -= 2;
            continue;
        }
    }else{        
                prompt('Pressione ENTER para ver quais são as suas opções para sobreviver e completar a missão com sucesso.');
                console.clear();
                console.log(`[1] Procurar material orgânico decomposto.`);
                console.log(`[2] Procurar rochas que contenham minerais para produzir a liga metálica da antena do rádio.`);
                console.log(`[3] Procurar comida.`);
                console.log(`[4] Verificar status.`);
                console.log(`[5] Voltar a Axiom. (Combustível 100%)`)
                console.log();

                let opcao = +prompt(`Escolha uma das opções para prosseguir: `);
                while (opcao != 1 && opcao != 2 && opcao != 3 && opcao != 4 && opcao != 5){
                    opcao = +prompt('Escolha uma opção válida para continuar: ');
                }

                if (opcao == 1){
                    let combustivel = procurarCombustivel();
                    if (combustivel == 1){
                        continue;
                    }else if (combustivel == 3){
                        if (heroi.horasTrabalhadas >= 18){
                            let dormir = heroi.dormir();
                            if (dormir == true){  
                                prompt();             
                            continue
                            }
                        }else{            
                            prompt();
                            continue;
                        }
                    }else if (combustivel == 2){
                        break;
                    }
                }else if (opcao == 2){
                    let metal = procurarMetal();
                    if (metal == 1){
                        continue;  
                    }else if(metal == 3){
                        if (heroi.horasTrabalhadas >= 18){
                            let dormir = heroi.dormir();
                            if (dormir == true){  
                                prompt();             
                            continue
                            }
                        }else{            
                            prompt();
                            continue;
                        }
                    }else if (metal == 2){
                        break;
                    }
                }else if (opcao == 3){
                    let comida = procurarComida();
                    if (comida == 1){
                        continue;  
                    }else if (comida == 3){
                        if (heroi.horasTrabalhadas >= 18){
                            let dormir = heroi.dormir();
                            if (dormir == true){ 
                                prompt();              
                            continue
                            }
                        }else{            
                            prompt();
                            continue;
                        }
                    }else if (comida == 2){
                        break;
                    }
                }else if (opcao == 4){
                    verificarStatus();
                    prompt();
                    continue;
                }else if (opcao == 5){                    
                    console.log();
                    console.log(`Parece que a nave já pode voar!`)
                    console.log();
                    console.log(`Mas você viu o que aconteceu da última vez né!?`);
                    console.log()
                    console.log(`É melhor não arriscar ser jogado no espaço pelo capitão...`);
                    prompt(`Pressione ENTER para finalizar a missão`);
                    continue;
                    }
                }
    }else if (radio == true && combustivel == false){
        countSinalRadio++;
        if (countSinalRadio == 1){
            console.clear();
            prompt('Pressione ENTER para ver quais são as suas opções para sobreviver e completar a missão com sucesso.');
            console.clear();
            console.log(`[1] Procurar material orgânico decomposto.`);
            console.log(`[2] Procurar rochas que contenham minerais para produzir a liga metálica da antena do rádio.`);
            console.log(`[3] Procurar comida.`);
            console.log(`[4] Verificar status.`);
            console.log(`[5] Chamar o comando da Axiom pelo Radio. (Sinal de Rádio 100%)`)
            console.log();
    
            let opcao = +prompt(`Escolha uma das opções para prosseguir: `);
            while (opcao != 1 && opcao != 2 && opcao != 3 && opcao != 4 && opcao != 5){
                opcao = +prompt('Escolha uma opção válida para continuar: ');
            }    
            if (opcao == 1){
                let combustivel = procurarCombustivel();
                if (combustivel == 1){
                    continue;
                }else if (combustivel == 3){
                    if (heroi.horasTrabalhadas >= 18){
                        let dormir = heroi.dormir();
                        if (dormir == true){  
                            prompt();             
                        continue
                        }
                    }else{            
                        prompt();
                        continue;
                    }
                }else if (combustivel == 2){
                    break;
                }
            }else if (opcao == 2){
                let metal = procurarMetal();
                if (metal == 1){
                    continue;  
                }else if(metal == 3){
                    if (heroi.horasTrabalhadas >= 18){
                        let dormir = heroi.dormir();
                        if (dormir == true){ 
                            prompt();              
                        continue
                        }
                    }else{            
                        prompt();
                        continue;
                    }
                }else if (metal == 2){
                    break;
                }
            }else if (opcao == 3){
                let comida = procurarComida();
                if (comida == 1){
                    continue;  
                }else if (comida == 3){
                    if (heroi.horasTrabalhadas >= 18){
                        let dormir = heroi.dormir();
                        if (dormir == true){  
                            prompt();             
                        continue
                        }
                    }else{            
                        prompt();
                        continue;
                    }
                }else if (comida == 2){
                    break;
                }
            }else if (opcao == 4){
                verificarStatus();
                prompt();
                continue;
            }else if (opcao == 5){
                console.clear();
                console.log(`Parece que o radio já pode ser consertado!`)
                console.log();
                console.log(`Recruta: Axiom... Axiom... aqui é ${heroi.nome}. Alguém na escuta?`);
                console.log();
                console.log(`Capitão: Recruta! Que bom ouvir a sua voz! Percebemos que você sofreu um acidente, mas achamos melhor não arriscar mandar outra nave e esta também se acidentar.`);
                console.log();
                console.log(`Recruta: capitão solicito resgate imediáto! A nave está avariada e demoraria demais para consertar com os recursos do planeta.`)
                console.log();
                console.log(`Capitão: Mas o planeta tem recursos para consertar a nave?`);
                console.log();
                console.log(`Recruta: Tem sim capitão!`);
                console.log();
                console.log(`Capitão: Pois então trate de consertar a nave e cumprir a sua missão de exploração. Só volte quando completar a missão!`);
                console.log();
                console.log(`Recruta: Não deveria ter falado que o planeta tem recursos...`)
                prompt(`Pressione ENTER para finalizar a missão`);
                console.clear();
                heroi.tempo(1);
                continue;
            }
        }else{
            console.clear();
            prompt('Pressione ENTER para ver quais são as suas opções para sobreviver e completar a missão com sucesso.');
            console.clear();
            console.log(`[1] Procurar material orgânico decomposto.`);
            console.log(`[2] Procurar rochas que contenham minerais para produzir a liga metálica da antena do rádio.`);
            console.log(`[3] Procurar comida.`);
            console.log(`[4] Verificar status.`);
            console.log(`[5] Chamar o comando da Axiom pelo Radio. (Sinal de Rádio 100%)`)
            console.log();
    
            let opcao = +prompt(`Escolha uma das opções para prosseguir: `);
            while (opcao != 1 && opcao != 2 && opcao != 3 && opcao != 4 && opcao != 5){
                opcao = +prompt('Escolha uma opção válida para continuar: ');
            }
    
            if (opcao == 1){
                let combustivel = procurarCombustivel();
                if (combustivel == 1){
                    continue;
                }else if (combustivel == 3){
                    if (heroi.horasTrabalhadas >= 18){
                        let dormir = heroi.dormir();
                        if (dormir == true){ 
                            prompt();              
                        continue
                        }
                    }else{            
                        prompt();
                        continue;
                    }
                }else if (combustivel == 2){
                    break;
                }
            }else if (opcao == 2){
                let metal = procurarMetal();
                if (metal == 1){
                    continue;  
                }else if(metal == 3){
                    if (heroi.horasTrabalhadas >= 18){
                        let dormir = heroi.dormir();
                        if (dormir == true){   
                            prompt();            
                        continue
                        }
                    }else{            
                        prompt();
                        continue;
                    }
                }else if (metal == 2){
                    break;
                }
            }else if (opcao == 3){
                let comida = procurarComida();
                if (comida == 1){
                    continue;  
                }else if (comida == 3){
                    if (heroi.horasTrabalhadas >= 18){
                        let dormir = heroi.dormir();
                        if (dormir == true){ 
                            prompt();              
                        continue
                        }
                    }else{            
                        prompt();
                        continue;
                    }
                }else if (comida == 2){
                    break;
                }
            }else if (opcao == 4){
                verificarStatus();
                prompt();
                continue;
            }else if (opcao == 5){
                console.clear();
                console.log(`Parece que o sinal do rádio já esta OK!`)
                console.log();
                console.log(`Mas você ouviu o que o capitão falou né!?`);
                console.clear()
                console.log(`É melhor não arriscar ser motivo de piada pelo comando da Axiom...`);
                prompt(`Pressione ENTER para finalizar a missão`);
                continue;
                }
            }
       
            

    }else{   
        console.clear();    
        prompt('Pressione ENTER para ver quais são as suas opções para sobreviver e completar a missão com sucesso.');
        console.clear();
        console.log(`[1] Procurar material orgânico decomposto.`);
        console.log(`[2] Procurar rochas que contenham minerais para produzir a liga metálica da antena do rádio.`);
        console.log(`[3] Procurar comida.`);
        console.log(`[4] Verificar status.`)
        console.log();

        let opcao = +prompt(`Escolha uma das opções para prosseguir: `);while (opcao != 1 && opcao != 2 && opcao != 3 && opcao != 4){
            opcao = +prompt('Escolha uma opção válida para continuar: ');
        }

        if (opcao == 1){
            let combustivel = procurarCombustivel();
            if (combustivel == 1){
                continue;
            }else if (combustivel == 3){
                if (heroi.horasTrabalhadas >= 18){
                    let dormir = heroi.dormir();
                    if (dormir == true){ 
                        prompt();              
                    continue
                    }
                }else{            
                    prompt();
                    continue;
                }
            }else if (combustivel == 2){
                break inicio;
            }
        }else if (opcao == 2){
            let metal = procurarMetal();
            if (metal == 1){
                continue;  
            }else if(metal == 3){
                if (heroi.horasTrabalhadas >= 18){
                    let dormir = heroi.dormir();
                    if (dormir == true){   
                        prompt();            
                    continue
                    }
                }else{            
                    prompt();
                    continue;
                }
            }else if (metal == 2){
                break inicio;
            }
        }else if (opcao == 3){
            let comida = procurarComida();
            if (comida == 1){
                continue;  
            }else if (comida == 3){
                if (heroi.horasTrabalhadas >= 18){
                    let dormir = heroi.dormir();
                    if (dormir == true){
                        prompt();               
                    continue;
                    }
                }else{            
                    prompt();
                    continue;
                }
            }else if (comida == 2){
                break inicio;
            }
        }else{
            verificarStatus();
            prompt();
            continue;
        }
    }
}
}   
}

//Fernando Carratti
//https://github.com/FernandoCarratti