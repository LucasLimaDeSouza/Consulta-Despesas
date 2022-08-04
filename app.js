class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if (this[i] == undefined || this[i] == null || this[i] == '') {
                return false
            }
        }
        return true
    }

}

class Bd {
    constructor() {
        let id = localStorage.getItem('id') //REVISAR //////////////////////////////////////////

        if (id === null) {
            localStorage.setItem('id',0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) +1
    }

    gravar(d) { 
        let id = localStorage.getItem("id") // REVISAR /////////////////////////////////////////////

        if (id === null) {
            id = 0
        } else {
            id = this.getProximoId()
        }
        
        localStorage.setItem('id', id)
        localStorage.setItem(id, JSON.stringify(d))
    }

    recuperarTodosRegistros() {
        let despesas = Array()

        let id = localStorage.getItem("id")


        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))
            if (despesa === null) {

                continue
            } 

            despesa.id = i
            despesas.push(despesa)

            
        }

        return (despesas)
    }

    remover(id) {

        localStorage.removeItem(id)

    }

    pesquisar(despesa) {
        let despesasFiltradas = Array() // FILTRAGEM

        despesasFiltradas = this.recuperarTodosRegistros()

        if(despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)

        }
        if(despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)

        }
        if(despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)

        }
        if(despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)

        }
        if(despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)

        }
        if(despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)

        }

        return despesasFiltradas  // RETORNA A FILTRAGEM
    }
    

    
}

let bd = new Bd() // FORAAAAA//////////////////////////////////////////////////////////////////

function cadastrarDespesas() {
    let ano = document.querySelector('#ano').value
    let mes = document.querySelector('#mes').value
    let dia = document.querySelector('#dia').value
    let tipo = document.querySelector('#tipo').value
    let descricao = document.querySelector('#descricao').value
    let valor = document.querySelector('#valor').value
    //MODAL /////////////////////////////////////////////////////////////////////////
    let titulo = document.querySelector('#tituloResultado')
    let aviso = document.querySelector('#aviso')
    let botao = document.querySelector('#botao')

    
    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    bd.gravar(despesa)

    
    
    if(despesa.validarDados()) {
        //modal foi
        $('#modalResultado').modal('show')
        titulo.innerHTML = "Registrado Com Sucesso"
        titulo.className = "text-success"
        aviso.innerHTML = "Clique Em Continuar Para Um Novo Registro"
        botao.className = "btn btn-success"
        botao.innerHTML = "Continuar"

        
    } else {
        //modal n foi
        $('#modalResultado').modal('show')
        titulo.innerHTML = "Registro Invalido"
        titulo.className = "text-danger"
        aviso.innerHTML = "Clique Em Voltar Para Consertar"
        botao.className = "btn btn-danger"
        botao.innerHTML = "Voltar"
        
        
    }
    
}

function carregarListaDespesas() {
    
    let despesas = Array()
    
    despesas = bd.recuperarTodosRegistros()
    
    console.log(despesas)

    let listaDespesas = document.querySelector('#listaDespesas')
    
    despesas.forEach(function(d) {

        
        let linhas = listaDespesas.insertRow()

        linhas.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linhas.insertCell(1).innerHTML = `${d.tipo}`
        linhas.insertCell(2).innerHTML = `${d.descricao}`
        linhas.insertCell(3).innerHTML = `${d.valor}`
        
        let btn = document.createElement('button')
        btn.className = "btn btn-danger"
        btn.innerHTML = "<i class = 'fas fa-times'></i>"
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function() {
            
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)
            window.location.reload()
            
        }
        linhas.insertCell(4).append(btn)

    })
}

function pesquisarDespesas() {
    let ano = document.querySelector('#ano').value
    let mes = document.querySelector('#mes').value
    let dia = document.querySelector('#dia').value
    let tipo = document.querySelector('#tipo').value
    let descricao = document.querySelector('#descricao').value
    let valor = document.querySelector('#valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor) // MANDA OS VALORES

    let pesquisas = bd.pesquisar(despesa) // RECEBE A FILTRAGEM

    console.log(pesquisas)

    let listaDespesas = document.querySelector('#listaDespesas') // VAI BUSCAR
    listaDespesas.innerHTML = "" // VAI ZERAR
    
    pesquisas.forEach(function(d) { // E O POR FIM, PREECHER


        let linhas = listaDespesas.insertRow()

        linhas.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linhas.insertCell(1).innerHTML = `${d.tipo}`
        linhas.insertCell(2).innerHTML = `${d.descricao}`
        linhas.insertCell(3).innerHTML = `${d.valor}`

        let btn = document.createElement('button')
        btn.className = "btn btn-danger"
        btn.innerHTML = "<i class = 'fas fa-times'></i>"
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function() {
            
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)
            window.location.reload()
            
        }
        linhas.insertCell(4).append(btn)

    })
}