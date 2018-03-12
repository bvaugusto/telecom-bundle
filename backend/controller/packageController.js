var fs = require('fs');

exports.list = function(callback){

    //leitura do arquivo .json
    fs.readFile('./public/plans.json', 'utf-8', function (err, data) {
        if(err){
            console.log('readFile');
            throw err;
        } 

        //parse ojbeto json
        var plans = JSON.parse(data);
        plans = plans.data;
        
        //objeto temporário para comparação
        var planTemp = plans;
        
        //armazena a concatenação dos planos e envia os dados para a view
        var result = [];

        //Definindo os graus de acordo com o relacionamento do diagrama
        var graus = [[0,2,6], [1,2,4,5,6], [2], [3], [4,3,6], [5,3,6], [6]];

        //Define os descontos de acordo com o relacionamento do diagrama
        var combinations = [{"0":0, "2":0, "6":-40}, {'1':0,'2':-10,'4':-10,'5':-20,'6':-40}, {'2':0}, {'3':0}, {'4':0,'3':35,'6':-10}, {'5':0,'3':15,'6':-30}, {'6':0}];

        //push dos nodos pai
        function pushPackage(plan){

            const package = {};
            package.name = plan.name;
            package.price = plan.price;
            package.type = plan.type;
            result.push(package);
        }

        //push nodos filhos
        function pushPackageChildren(plan, planTemp, combinations){
            
            const package = {};
            package.name = plan.name + ' + ' +planTemp.name;
            package.type = plan.type;
            
            //condição de tratamento quando não existir combinação
            if(combinations == undefined)
                combinations = 0;

            package.price = plan.price + (combinations) + planTemp.price;
            result.push(package);
        }

        //função destinada a montar os pacotes filhos
        function mountPackageChildren(plan, planTemp, grausChildren, combinations){

            if(combinations.length === 0)
                combinations = {};
            
            var packageConcat = {};
            packageConcat.name = plan.name;
            packageConcat.price = plan.price;
            packageConcat.type = plan.type;

            for (let index = 0; index < grausChildren.length; index++) {
                var package = {};
                const element = grausChildren[index];

                if(plan.type != planTemp[element].type){
                    pushPackageChildren(plan, planTemp[element], combinations[element]);
                }
                
                //concatena todas as combinações em relação ao nodo principal
                if(grausChildren.length > 1){
                    packageConcat.name += ' + '+planTemp[element].name;
                    
                    //condição de tratamento quando não existir combinação
                    if(combinations[element] == undefined)
                        combinations = 0;
                    else
                        combinations = combinations[element];

                    packageConcat.price += (combinations) + planTemp[element].price;  
                } 
            }

            if(grausChildren.length > 1)
                result.push(packageConcat);
        }

        //função destinada a montar o nodo principal
        function mountPackage(plan, planTemp, combinations) {
            pushPackage(plan);
            for (let index = 0; index < planTemp.length; index++) {
                const element = planTemp[index];
                const package2 = {}

                if(plan.type != element.type){
                    mountPackageChildren(plan, planTemp, graus[index], combinations);
                }
            }
        }

        //função destinada a criar o arquivo .json final
        function createFilePackage(result){
            data = JSON.stringify(result);
            fs.writeFile('./public/packages.json', data, (err) => {
                if (err){
                    console.log('readFile');
                    throw err;
                }else
                    console.log('Arquivo criado com sucesso!');
            });
        }

        //interação de cada objeto do diagrama
        for (let index = 0; index < plans.length; index++) {
            const element = plans[index];
            mountPackage(element, planTemp, combinations[index]);
        } 
        
        //chamada da função que cria o json final
        createFilePackage(result);

        //exporta o resultado para a view
        callback(result);
    });
};