/*!
 * Paths Finder
 * 
 * Copyright (c) 2024 Paths Finder - Agnello Renato Nicolae
 * 
 * Licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License.
 * You may obtain a copy of the License at https://creativecommons.org/licenses/by-nc-nd/4.0/
 * 
 * You are free to:
 * - Share — copy and redistribute the material in any medium or format
 * 
 * Under the following terms:
 * - Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
 * - NonCommercial — You may not use the material for commercial purposes.
 * - NoDerivatives — If you remix, transform, or build upon the material, you may not distribute the modified material.
 * - No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.
 * 
 * This project uses the vis.js library, which is licensed under the MIT License.
 */


// variabile per visualizzare i messaggi utili al debug e alla comprensione del codice
let debug = true;

// tutti gli algoritmi utilizzabili nel programma
let algorithms = ["dijkstra", "dijkstra - oriented", "bellman ford", "bellman ford - oriented"];

// inizializzo la variabile che contrassegna l'algoritmo selezionato
let selectedAlgorithm = 0;

// determino se l'algoritmo è orientato
let isOriented = algorithms[selectedAlgorithm].includes("oriented");


/**
 * funzione anonima per controllare se il client utilizza un dispositivo mobile
 * 
 * @returns {boolean} true se è un dispositivo mobile, false altrimenti
 */
window.mobileCheck = function() {
    let check = false;
    // la funzione per mezzo di un'espressione regolare interroga le configurazioni dello user agent
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};


// verifica se il dispositivo è mobile
let isMobile = window.mobileCheck();


document.addEventListener('DOMContentLoaded', function() {
    // ottiene il riferimento all'elemento dropdown
    const dropdownList = document.getElementById('algorithm-selector');

    // itera attraverso ciascun algoritmo nell'array "algorithms"
    algorithms.forEach((algorithm, i) => {
        // creare un elemento option per ogni algoritmo
        var option = document.createElement('option');
        // imposta il testo dell'opzione come nome dell'algoritmo
        option.text = algorithm;
        // imposta il valore dell'opzione come l'indice dell'algoritmo nell'array
        option.value = i;
        // aggiunge l'opzione all'elemento dropdown
        dropdownList.appendChild(option);
    });


    // aggiunge un listener per l'evento "change" all'elemento dropdown
    dropdownList.addEventListener("change", selectAlgorithm);


    // definisco un listener per l'evento "keydown" all'elemento contenitore del grafo
    window.addEventListener("keydown", function(event) {
        // verifico se il tasto premuto è il backspace e se un nodo è attualmente selezionato
        if (event.key === "Backspace" && network.getSelectedNodes().length > 0) {
            // rimuovo il nodo selezionato dal grafo
            removeNode();
        } else if (event.key === "Backspace" && network.getSelectedEdges().length > 0) {
            // rimuovo l'arco selezionato dal grafo
            removeEdge();
        } else if(event.key === "Enter") {
            // chiedo quali sono i nodi da collegare e faccio partire l'algoritmo
            runAlgorithm();
        } else if(event.key === "c") {
            fitGraph();
        } else if (event.key === "Backspace" && event.metaKey) {
            removeAllNodes();
        } else if (event.key === "Backspace" && event.shiftKey) {
            removeAllConnections();
        }
    });


    // gestione dell'evento di doppio clic o doppio tap sul grafo
    network.on("doubleClick", doubleClickHandler);
    network.on("doubleTap", doubleClickHandler);

    // aggiungo un listener per l'evento "click" all'elemento contenitore del grafo
    container.addEventListener("click", clickOrTapHandler);
    // aggiungo un listener per l'evento "tap" all'elemento contenitore del grafo
    container.addEventListener("tapEnd", clickOrTapHandler);

}, false);


/**
 * la funzione gestisce la selezione dell'algoritmo da parte dell'utente
 * 
 * @param {*} event 
 */
function selectAlgorithm(event) {
    let select = Number.parseInt(event.target.value);

    if (selectedAlgorithm != select) {
        // se presente un percorso lo rimuovo
        if (isPathHighlighted) clearHighlight();

        if ((selectedAlgorithm !== 0 && selectedAlgorithm !== 1) && (select === 0 || select === 1)) {
            var negativeEdges = edges.get({
                filter: function (item) {
                    return item.label < 0;
                }});

            if (negativeEdges.length>0) {
                alert("All negative weights will change to 1...")
                edges.update(negativeEdges.map(edge => ({ id: edge.id, label: "" + 1 })));
            }
        }

        selectedAlgorithm = select;

        // controllo se si è selezionato una versione orientata dell'algoritmo
        let isOrientedNow = algorithms[selectedAlgorithm].includes("oriented");

        // se si passa da una versione orientata a una non orientata aggiorno il grafo
        if (isOriented != isOrientedNow) {
            // se adesso è orientato imposto le freccie, altrimenti un semplice collegamento
            edges.update(edges.get().map(edge => ({ id: edge.id, arrows: (isOrientedNow) ? "to" : "false" })));
        }

        // aggiorno la variabile globale
        isOriented = isOrientedNow;
    }
}


// inizializzazione di un insieme vuoto per i nodi e gli archi del grafo
var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);


// ottengo i riferimenti dell'elemento HTML che conterrà il grafo, del contenitore del risultato e del contenitore delle soluzioni
var container = document.getElementById("network");
var resultContainer = document.getElementById("algorithm-result");
let solutions = document.getElementById("algorithm-solutions");


// flag per indicare se si sta facendo visualizzare una soluzione nel grafo
var isPathHighlighted = false;


// limite massimo di nodi non connessi - precauzione dovuta alle prestazioni
const unconnectedNodesLimit = 4;


// definizione dei dati e delle opzioni per il grafo
var data = {
    nodes: nodes,
    edges: edges,
};

// opzioni dei nodi per desktop e dispositivi mobili
var desktopNodeOptions = {
    shape: "circle",
    size: 25,
    borderWidth: 1,
    color: {
        border: "black",
        background: "beige",
        highlight: {
            border: '#2B7CE9',
            background: '#D2E5FF'
        }
    },
    font: {
        size: 18,
        color: "black",
        align: "center",
        multi: true,
        face: "Monospace"
    },
    scaling: {
        label: {
            enabled: true
        }
    },
    widthConstraint: 35,
};

var mobileNodeOptions = {
    shape: "circle",
    size: 20,
    borderWidth: 1,
    color: {
        border: "black",
        background: "beige",
        highlight: {
            border: '#2B7CE9',
            background: '#D2E5FF'
        }
    },
    font: {
        size: 20,
        color: "black",
        align: "center",
        multi: true,
        face: "Monospace"
    },
    scaling: {
        label: {
            enabled: true
        }
    },
    widthConstraint: 48,
};

// utilizzo le opzioni appropriate in base al dispositivo
var options = {
    physics: {
        enabled: false,
    },
    edges: {
        font: {
            size: isMobile ? 20 : 18, // Imposta la dimensione del carattere degli archi
            color: 'black', // Imposta il colore del testo degli archi
        },
        color: {
            color: 'black' // Imposta il colore predefinito degli archi
        },
        smooth: {
            type: 'continuous', // o 'dynamic'
            forceDirection: 'none' // opzioni: 'horizontal', 'vertical', 'none'
            //roundness: 0 // valore compreso tra 0 e 1
        },
        label: {
            align: 'center'
        }
    },
    nodes: isMobile ? mobileNodeOptions : desktopNodeOptions,
    manipulation: {
        enabled: false
    },
    interaction: {
        dragNodes: true,
        dragView: true,
    }
};

// Creazione del grafo utilizzando i dati e le opzioni definite sopra
var network = new vis.Network(container, data, options);


// definisco i nodi di default
var nodesData = [
    { id: 1, label: '1', x: -80, y: 20 },
    { id: 2, label: '2', x: 100, y: 90 },
    { id: 3, label: '3', x: 140, y: 260 },
    { id: 4, label: '4', x: -120, y: 230 },
    { id: 5, label: '5', x: -140, y: 360 },
    { id: 6, label: '6', x: 140, y: 370 },
    { id: 7, label: '7', x: -80, y: 510 }, 
    { id: 8, label: '8', x: 50, y: 510 },  
    { id: 9, label: '9', x: 140, y: 630 }, 
    { id: 10, label: '10', x: -90, y: 620 }
];

// definisci i rispettivi archi
var edgesData = [
    { from: 1, to: 2, label: '4' },
    { from: 1, to: 3, label: '7' },
    { from: 1, to: 4, label: '2' },
    { from: 2, to: 3, label: '3' },
    { from: 2, to: 5, label: '1' },
    { from: 3, to: 5, label: '6' },
    { from: 3, to: 6, label: '8' },
    { from: 4, to: 5, label: '3' },
    { from: 5, to: 6, label: '4' },
    { from: 5, to: 7, label: '7' },
    { from: 5, to: 8, label: '6' },
    { from: 6, to: 7, label: '5' },
    { from: 6, to: 9, label: '2' },
    { from: 7, to: 9, label: '4' },
    { from: 8, to: 9, label: '3' },
    { from: 8, to: 10, label: '5' },
    { from: 9, to: 10, label: '2' },
    { from: 3, to: 8, label: '1' }
];
  
// aggiungo i nodi e gli archi al grafo
nodes.add(nodesData);
edges.add(edgesData);


// formatto correttamente la visualizzazione nel cavas
fitGraph();

// prevWindowWidth rappresenta la larghezza della finestra del browser, ottenuta utilizzando window.innerWidth se supportato, altrimenti document.documentElement.clientWidth
var prevWindowWidth = window.innerWidth || document.documentElement.clientWidth;
// esegui fitGraph() se la differenza tra le dimensioni della finestra prima e dopo il ridimensionamento supera 50px
window.addEventListener('resize', function() {
    var currentWindowWidth = window.innerWidth || document.documentElement.clientWidth;
    if (Math.abs(currentWindowWidth - prevWindowWidth) > 50) {
        fitGraph();
        prevWindowWidth = currentWindowWidth;
    }
});


// inizializzazione della variabile utilizzata per memorizzare l'ID del primo nodo selezionato durante un doppio clic
var firstNodeId = null;


//  variabile utile per non sovrapporre gli eventi sottoscritti con click e double click
var justDoubleClicked = false;


function doubleClickHandler(params) {
    // controllo se è stato selezionato un nodo durante il doppio clic
    if (params.nodes.length > 0) {

        // ottieni l'ID del nodo selezionato
        var selectedNode = params.nodes[0];
                
        // memorizzo l'ID del nodo selezionato
        firstNodeId = selectedNode;

        // evidenzia il nodo selezionato
        var selectedNode = network.body.nodes[firstNodeId];
        selectedNode.setOptions({
            color: {
                highlight: {
                    border: '#ebe939',
                    background: '#ffff7a'
                } 
            }
        });
            
        // aggiorno la variabile globale
        justDoubleClicked = true;

    } else if(params.edges.length > 0){
        // controllo se è stato selezionato un arco durante il doppio clic
        var clickedEdge = params.edges[0];

        if (clickedEdge) {
            // Se è stato selezionato un arco, chiedi all'utente di inserire il nuovo costo per quell'arco
            var edgeData = edges.get(clickedEdge);
            var costEdgeValidation, newEdgeCost;

            do{
                costEdgeValidation = true
                var promptOut = prompt("Enter the new cost for this edge" + ((selectedAlgorithm === 1 || selectedAlgorithm === 0) ? " (only positive values!)" : "") + ":", edgeData.label);

                if(promptOut === null) return null;
                
                newEdgeCost = parseInt(promptOut);

                if(isNaN( newEdgeCost )){
                    alert("Warning: you gave a non-numeric character as your Edge Weight!");
                    costEdgeValidation = false;
                }
                
                if(newEdgeCost < 0 && (selectedAlgorithm === 1 || selectedAlgorithm === 0)) {
                    alert("Warning: nodes weights must be positive values!")
                    costEdgeValidation = false;
                }

            }while(!costEdgeValidation)
            
            // se il nuovo valore non corrisponde al vecchio allora aggiorno l'etichetta
            if (edgeData.label != newEdgeCost) {
                edgeData.label = "" + newEdgeCost;
                edges.update(edgeData);

                // rimuovi l'evidenziazione se è stata evidenziato un percorso più breve
                if (isPathHighlighted) clearHighlight();
            }
        }
    } else {
        // creo un nuovo nodo nella posizione un cui si è fatto doppio click/tap
        
        // ottengo la posizione del puntatore per i due assi
        var posX = params.pointer.canvas.x
        var posY = params.pointer.canvas.y

        // aggiungo al foglio il nodo
        addNode(posX, posY, false);
    }
}


/**
 * funzione che gestisce la deselezione di un nodo precedentemente evidenziato dal doppio click/tap
 */
network.on("deselectNode", function (params) {
    if(firstNodeId){
        var deselectedNodeId = params.previousSelection.nodes[0].id;
        var node = network.body.nodes[deselectedNodeId];
        node.setOptions({
            font: {
                size: options.nodes.font.size,
                color: options.nodes.font.color
            },
            color: {
                highlight: {
                    border: options.nodes.color.highlight.border,
                    background: options.nodes.color.highlight.background
                } 
            }
        });
    }
});


/**
 * la funzione gestisce la connessione del nodo cliccato al nodo precedentemente evidenziato dal doppio click/tap
 * 
 * @param {*} event, oggetto rappresentanta l'evento passato dal gestore degli eventi js
 */
function clickOrTapHandler(event) {
    if (firstNodeId !== null) {
        // ottengo il rettangolo che rappresenta il bordo dell'elemento contenitore del grafo
        var boundingRect = container.getBoundingClientRect();

        // calcolo le coordinate del punto del tap all'interno dell'elemento contenitore del grafo
        var pointerX = event.clientX - boundingRect.left;
        var pointerY = event.clientY - boundingRect.top;

        // ottengo l'ID del nodo che si trova sotto il punto del tap
        // metodo di Vis Network che restituisce l'ID del nodo se il punto specificato dalle coordinate si trova all'interno di un nodo
        // Se il punto non è all'interno di un nodo, il metodo restituirà undefined.
        var nodeId = network.getNodeAt({ x: pointerX, y: pointerY });

        if(nodeId === undefined) {
            
            firstNodeId = null;

        } else {

            // solo se il double click non è avvenuto in concomitanza con il click,
            // il secondo nodo selezionato non è uguale al primo e non è stato già registrato il collegamento, connetto con un arco i due nodi
            if(!justDoubleClicked && firstNodeId !== nodeId) {
                    
                    // rimuovo l'evidenziazione
                    clearHighlight();

                    resultContainer.innerHTML = "";
                    
                    if( !edgeExists(firstNodeId, nodeId) && (isOriented || !edgeExists(nodeId, firstNodeId)) )  {
                        edges.add({ from: firstNodeId, to: nodeId, arrows: (isOriented) ? "to" : "false", label: "1" });                 
                    }
                    
                    firstNodeId = null;

            } else {
                justDoubleClicked = false;
            }
        }
    }
}


/**
 * la funzione rimuove tutte le connessioni di tutti i nodi
 */
function removeAllConnections(){
    clearHighlight()
    edges.clear();
}


/**
 * la funzione rimuove tutti i nodi
 */
function removeAllNodes(){
    nodes.clear();
    removeAllConnections();
}


/**
 * funzione per adattare la visualizzazione del grafo alla finestra
 */
function fitGraph() {
    network.fit();
}


/**
 * funzione per aggiungere un nuovo nodo al grafo
 * 
 * @param {*} posX, posizione del nodo sull'asse delle ascisse
 * @param {*} posY, posione del nodo sull'asse delle ordinate
 * @param {*} fitNetwork, opzione per adattare il nodo alla visuale dopo l'aggiunta
 * @returns 
 */
function addNode(posX = null, posY = null, fitNetwork = true) {
    // trovo i nodi non connessi nel grafo
    var unconnectedNodes = findUnconnectedNodes();
    
    // se inodi non connessi superano il numero massimo, mostra un messaggio di avviso
    if (unconnectedNodes.length >= unconnectedNodesLimit) {
        alert("You cannot add a node if there are more than " + unconnectedNodesLimit + " unconnected nodes.");
        return;
    }

    // se il percorso più breve è stato evidenziato, rimuovi l'evidenziazione
    clearHighlight();

    // trova il numero più basso non utilizzato come ID per il nuovo nodo
    var id = findLowestNumber();

    // definisco la posizione che il nodo dorvrà assumere
    var posX = (posX) ? posX : Math.random() * 150; 
    var posY = (posY) ? posY : Math.random() * 150; 

    // aggiungo un nuovo nodo al grafo con l'ID trovato
    nodes.add({ id: id, label: ("" + id), x: posX, y: posY });

    if(fitNetwork)  fitGraph();
}


/**
 * funzione per trovare i nodi non connessi nel grafo
 * 
 * @returns 
 */
function findUnconnectedNodes() {
    var unconnectedNodes = [];
    
    // ottengo tutti i nodi che non hanno un collegamento
    nodes.forEach(function (node) {

        // trova gli archi collegati al nodo corrente attraverso un filtro
        var connectedEdges = edges.get({
            filter: function (item) {
                return item.from === node.id || item.to === node.id;
            }
        });

        // se il nodo non ha archi connessi, lo aggiungo alla lista dei nodi non connessi
        if (connectedEdges.length === 0) {
            unconnectedNodes.push(node.id);
        }
    });

    return unconnectedNodes; // restituisco i nodi non connessi trovati
}


/**
 * funzione per trovare il numero più basso a partire da 1 non utilizzato come ID nel grafo
 * 
 * @returns {number} il primo numero a partite da 1 non utilizzato nel grafo
 */
function findLowestNumber() {
    if (nodes.length === 0) return 1; // se non ci sono nodi nel grafo, restituisco 1 come ID

    var idSet = new Set(nodes.getIds()); // ottiengo il Set degli ID dei nodi nel grafo


    // ripeto per un numero pari alla lunghezza del set + 1 così da ottenere il successivo dell'ultimo nodo aggiunto all'ultima iterazione
    for (var i = 1; i <= idSet.size + 1; i++) {
        if (!idSet.has(i)) {
            return i;
        }
    }
}


/**
 * funzione per rimuovere un nodo dal grafo
 */
function removeNode() {
    // ottengo l'ID del nodo selezionato
    var selectedNodeId = network.getSelectedNodes()[0];
    if (selectedNodeId) {
        // rimuovo l'evidenziazione
        clearHighlight();

        // rimuovo gli archi collegati al nodo selezionato
        edges.remove(edges.get({ filter: function(item) {
            return item.from === selectedNodeId || item.to === selectedNodeId;
        }}));

        // rimuovo il nodo selezionato dal grafo
        nodes.remove({ id: selectedNodeId });
    }
}


/**
 * funzione per rimuovere un arco dal grafo
 */
function removeEdge() {
    // ottengo l'ID dell'arco selezionato
    var selectedEdgeId = network.getSelectedEdges()[0];
    if (selectedEdgeId) {
        // rimuovo l'evidenziazione
        clearHighlight();

        // rimuovo l'arco selezionato dal grafo
        edges.remove({ id: selectedEdgeId });
    }
}


/**
 * funzione per verificare se esiste già un arco tra due nodi
 * 
 * @param {number} from, etichetta del nodo di partenza
 * @param {number} to, etchetta del nodo di arrivo 
 * @returns {boolean} true se esiste un arco che unisce i due nodi, false altrimenti
 */
function edgeExists(from, to) {
    // ottengo gli archi tra i due nodi specificati
    var existingEdges = edges.get({
        filter: function (edge) {
            return edge.from === from && edge.to === to;
        }
    });
    return existingEdges.length > 0;
}


/**
 * funzione per eseguire l'algoritmo selezionato e visualizzare il percorso più breve nel grafo
 * 
 * @returns {null} l'utente ha annullato l'inserimento delle etichette dei nodi
 */
function runAlgorithm() {
    let startNodeId, endNodeId;

    // chiedo attraverso la console le etichette del nodi di partenza e del nodo di arrivo
    startNodeId = askNodeId("start");
    if(startNodeId === null) return;

    endNodeId = askNodeId("end");
    if(endNodeId === null) return;


    // variabile per memorizzare il risultato
    let shortestPaths;

    // eseguo l'algoritmo selezionato
    switch (selectedAlgorithm) {
        case 0:
        case 1:
            shortestPaths = AlgorithmWithExclusion(startNodeId, endNodeId, dijkstraHelper);
            break;
        case 2:
        case 3:
            shortestPaths = AlgorithmWithExclusion(startNodeId, endNodeId, bellmanfordHelper);
    }

    // se è stato trovato un percorso più breve, lo visualizzo nel grafico
    if (shortestPaths !== null) {
        highlightPaths(shortestPaths);
    } else {
        // altrimenti cancello l'evidenziazione precedente nel grafo
        clearHighlight();

        // avverto l'utente della mancata soluzione 
        let info = document.createElement("p");
        info.innerText = "No path found!";
        resultContainer.appendChild(info);
    }
}


/**
 * richiedo all'utente di inserire l'ID di un nodo
 * 
 * @param {String} nodeName, tipologia di nodo nel percorso
 * @returns {number} etichetta del nodo fornita dall'utente
 */
function askNodeId(nodeName){
    var nodeId;
    var nodeIdValidation;

    do{
        nodeIdValidation = true;
        var promptOut = prompt("Enter the " + nodeName + " node ID:");

        if(promptOut === null) return null;

        nodeId = parseInt(promptOut);
        if(isNaN( nodeId )){
            nodeIdValidation = false;
            alert("Warning: you gave a non-numeric character as your " + nodeName +  " Node Id");
        }
    }while(!nodeIdValidation);

    return nodeId;
}


/**
 * funzione per rimuovere l'evidenziazione del percorso più breve dal grafo
 */
function clearHighlight() {
    //rimuovo le/a soluzioni/e dal video
    resultContainer.innerHTML = "";
    solutions.innerHTML = "";

    // aggiorna i colori dei nodi ed eliminai colori degli archi per rimuovere l'evidenziazione
    nodes.update(nodes.get().map(node => ({ id: node.id, color: {
        border: "black",
        background: "beige"
    } })));

    edges.update(edges.get().map(edge => ({ id: edge.id, color: "black" })));
    

    // reimposto il flag per l'evidenziazione del percorso a false
    isPathHighlighted = false;
}


/**
 * funzione per visualizzare tra le soluzioni un percorso trovato come soluzione
 * 
 * @param {Array} path, percorso da visualizzare nel documento
 * @param {number} index, indice della soluzione
 * @param {string} color, colore che contraddistingue la soluzione nel grafo
 */
function displayResult(path, index, color) {
    if (index == 0) {
        solutions.innerHTML = "";
        resultContainer.innerHTML = "";

        let costSolution = document.createElement('h2');
        costSolution.innerText = "Cost: " + path.cost;

        let solutionsLabel = document.createElement('h4');
        solutionsLabel.innerText = "Paths:";

        resultContainer.appendChild(costSolution);
        resultContainer.appendChild(solutionsLabel);
    }

    // contenitore delle informazioni visualizzate a video
    let solutionRow = document.createElement("div");
    solutionRow.className = "solution-row";

    // segnaposto per riconoscere il percorso nella rappresentazione visiva
    let mark = document.createElement("div");
    mark.className = "mark";
    mark.style.backgroundColor = color;
    
    // elemento che conterrà le informazioni del percorso
    let info = document.createElement("p");
    info.innerHTML = "n°" + (index+1) + ": " + path.path.join(" -> ");


    solutionRow.appendChild(mark);
    solutionRow.appendChild(info);

    solutions.appendChild(solutionRow);
    resultContainer.appendChild(solutions);
}


/**
 * la funzione genera un colore in formato hsl(hue - tonalità, saturation - saturazione, lightiness - luminosità) ed esclude i colori troppo scuri
 * 
 * @returns {string} il colore generato casualmente
 */
function getRandomColor() {
    // genero un colore dove la tonalità viene scelta casualmente, viene attribuita piena saturazione e la luminosità al 75% per evitare colori troppo scuri
    color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    return color;
}


/**
 * la funzione si occupa di evidenziare per ogni soluzione i cammini, nodi e collegamenti, nel grafico
 * 
 * @param {object} paths, i percorsi da evidenziare nel grafo
 */
function highlightPaths(paths) {
    // cancella l'evidenziazione precedente, se presente
    clearHighlight();

    isPathHighlighted = true; // imposto il flag per l'evidenziazione del percorso a true

    // evidenzia gli altri percorsi minimi
    for (var i = 0; i < paths.length; i++) {
        // genero un colore per l'evidenziazione
        highlighterColor = getRandomColor();

        // mostro il visualizzo le informazioni del percorso trovato
        displayResult(paths[i], i, highlighterColor);

        // evidenzio i nodi del percorso cambiandone il colore
        for (var j = 0; j < paths[i].path.length; j++) {
            var currentNode = paths[i].path[j];
            let node = nodes.get(currentNode)
            if (node && node.color.background === options.nodes.color.background) {
                nodes.update({ id: currentNode, color: { background: highlighterColor, border: highlighterColor } });
            }
        }

        // evidenzio gli archi del percorso cambiandone il colore
        for (var j = 0; j < paths[i].path.length - 1; j++) {
            var fromNodeId = paths[i].path[j];
            var toNodeId = paths[i].path[j + 1] ;
            
            // trovo l'ID dell'arco tra i due nodi del percorso, se orientato per entrambe le direzioni
            var edgeId = edges.getIds({ filter: function (item) { 
                return item.from === fromNodeId && item.to === toNodeId || 
                    (!isOriented && item.to === fromNodeId && item.from === toNodeId); 
                } })[0];

            let edge = edges.get(edgeId);

            // aggiorno il colore dell'arco trovato
            if (edge && edge.color === options.edges.color.color)
                edges.update({ id: edgeId, color: highlighterColor });
        }
    }
}


/**
 * la funzione per costruire la matrice delle adiacenze del grafo
 * 
 * @returns {Array} la matrice delle adiacenze
 */
function buildAdjacencyMatrix() {
    var adjacencyMatrix = []; // inizializzo la matrice delle adiacenze
    var nodeIds = nodes.getIds(); // ottengo degli ID dei nodi nel grafo

    for (var i = 0; i < nodeIds.length; i++) {
        var row = [];
        for (var j = 0; j < nodeIds.length; j++) {

            // trovo l'arco tra i due nodi correnti
            var edge = edges.get({
                filter: function (item) {
                    return (item.from === nodeIds[i] && item.to === nodeIds[j]) || (!isOriented && item.from === nodeIds[j] && item.to === nodeIds[i])
                }
            })[0];

            // se l'arco esiste, aggiungo il costo dell'arco alla riga della matrice delle adiacenze
            if (edge) {
                row.push(parseInt(edge.label));
            } else {
                // altrimenti aggiungo Infinity come costo
                row.push(Infinity);
            }
        }

        // aggiungo la riga alla matrice delle adiacenze
        adjacencyMatrix.push(row);
    }

    return adjacencyMatrix;
}


///////////
//////codice per l'implementazione degli algoritmi di ricerca
///////////


/**
 * la funzione ottiene il numero di indice di un nodo per la corrispettiva etichetta
 * 
 * @param {number} label, l'etichetta nodo su cui effettuare la ricerca
 * @returns {number} l'indice del nodo oppure -1
 */
function getNodeIndexByLabel(label) {
    var nodeIds = nodes.getIds(); // ottengo gli ID di tutti i nodi

    for (var i = 0; i < nodeIds.length; i++) {
        var nodeId = nodeIds[i];

        if (nodeId === label) {
            return i;
        }
    }

    return -1; // Restituisci null se il nodo con il label fornito non è stato trovato
}


/**
 * la funzione ottiene l'etichetta di un nodo per il corrispettivo indice
 * 
 * @param {number} index, indice su cui la ricerca viene effettuata
 * @returns {number} l'etichetta del nodo oppure -1
 */
function getNodeLabelByIndex(index) {
    var graphNodes = nodes.get();
    
    // se l'indice fornito è maggiore dell'ultima posione dei nodi restituisco -1
    if((graphNodes.length-1) < index ) return -1;

    var node = graphNodes[index];

    return node.id;
}


/**
 * funzione che determina l'esistenza di un nodo tra quelli registrati
 * 
 * @param {number} nodeLabel, etichetta del nodo da ricercare
 * @returns {boolean} true se il nodo ricercato è presente, false altrimenti
 */
function nodeExistence(nodeLabel){
    var nodeIds = nodes.getIds();
    var nodeExistence = false;

    nodeIds.forEach(nodeId => {
        if(nodeId == nodeLabel) {
            nodeExistence = true;
            return;
        }
    })

    return nodeExistence;
}


/**
 * la funzione esclude da una matrice delle adiacenze delle adiacenze un percorso di nodi
 * 
 * @param {Array} adjacencyMatrix, la matrice delle adiacenze
 * @param {Object} path, i collegamenti da escludere dalla matrice delle adiacenze
 * @returns {Array} la matrice delle adiacenze con i collegamenti esclusi
 */
function excludePath(adjacencyMatrix, path) {
    var excludedMatrix = adjacencyMatrix.map(function(row) {
        return row.slice();
    });

    for (var i = 1; i < path.length; i++) {
        var from = path[i - 1] - 1;
        var to = path[i] - 1;

        if (from >= 0 && from < excludedMatrix.length && to >= 0 && to < excludedMatrix.length) {
            excludedMatrix[from][to] = Infinity;

            // se il grafo non è orientato, aggiungi l'arco inverso solo se non esiste già un arco diretto
            if (!isOriented && adjacencyMatrix[to][from] === Infinity) {

                excludedMatrix[to][from] = Infinity;
            }
        }
    }

    return excludedMatrix;
}


/**
 * funzione per eseguire l'algoritmo fornito come parametro con la possibilità di escludere parti del grafo e ottenere altri minimum spanning tree
 * 
 * @param {number} startNodeLabel, etichetta del nodo di partenza 
 * @param {number} endNodeLabel, etichetta del nodo di arrivo
 * @param {Function} algorithm, callback utilizzata per chiamare l'algoritmo desiderato dall'utente
 * @returns {Object} le soluzioni trovate dell'algoritmo
 */
function AlgorithmWithExclusion(startNodeLabel, endNodeLabel, algorithm) {
    if (!nodeExistence(startNodeLabel) || !nodeExistence(endNodeLabel)) return null;

    if (debug) {
        var startTime = new Date();
    }

    var startNodeId = getNodeIndexByLabel(startNodeLabel);
    var endNodeId = getNodeIndexByLabel(endNodeLabel);

    // array per memorizzare i percorsi minimi trovati
    var mainShortestPaths = [];

    // ottengo la matrice delle adiacenze del grafo utilizzando la classe Graph
    var adjacencyMatrix = buildAdjacencyMatrix();

    // eseguo l'algoritmo per trovare la prima soluzione
    mainShortestPaths[0] = algorithm(startNodeId, endNodeId, adjacencyMatrix, true);

    // se non è stata trovata una soluzione, restituisco null
    if (mainShortestPaths[0].cost === Infinity) return null;

    // se la soluzione trovata ha solo un nodo da percorrere allora 
    if (mainShortestPaths[0].path.length === 1) {
        mainShortestPaths.forEach(shortestPath => {
            shortestPath.path = shortestPath.path.map(nodeIndex => getNodeLabelByIndex(nodeIndex - 1));
        });        
        return mainShortestPaths;
    }

    // escludi il percorso appena trovato dal calcolo del percorso minimo successivo
    adjacencyMatrix = excludePath(adjacencyMatrix, mainShortestPaths[0].path);
    
    // trovo le soluzioni che non coinvolgono le connessioni di altri percorsi minimi
    let i = 0;
    while ((i+1) === mainShortestPaths.length) {

        let shortestPath = dijkstraHelper(startNodeId, endNodeId, adjacencyMatrix);

        // aggiungo la soluzione se compatibile
        if (shortestPath !== null && shortestPath.cost === mainShortestPaths[i].cost) {
            mainShortestPaths.push(shortestPath);
            adjacencyMatrix = excludePath(adjacencyMatrix, shortestPath.path);
        }

        i++;
    }


    let secondShortestPaths = [];

    adjacencyMatrix = buildAdjacencyMatrix();

   
    for (let i=0; i<mainShortestPaths.length; i++) {
        exploreAllExclusions(algorithm, startNodeId, endNodeId, adjacencyMatrix, mainShortestPaths[i], secondShortestPaths, mainShortestPaths);

        // escludo dalle soluzioni trovate quella corrente        
        let tempMainShortestPaths = mainShortestPaths.filter((_, index) => index !== i);

        for (let j=0; j<tempMainShortestPaths.length; j++) {
            let pairs = [];

            // per ogni soluzione trova tutte le coppie adiacenti nel percorso più breve
            for(let k=0; k<tempMainShortestPaths[j].path.length; k++){
                pairs.push([tempMainShortestPaths[j].path[k], tempMainShortestPaths[j].path[k + 1]]);
            }

            // trova tutte le combinazioni possibili delle coppie adiacenti
            let allEdgesCombinations = [];

            for (let i = 0; i < (pairs.length-1); i++) {
                let tempCombinations = [];
                matrixPermutationsFinder(pairs, i+1, tempCombinations);
                allEdgesCombinations = allEdgesCombinations.concat(tempCombinations);
            }
            
            // esplora tutte le possibili esclusioni dei collegamenti della prima soluzione
            for (let k = 0; k < (allEdgesCombinations.length); k++) {
                // crea una copia della matrice delle adiacenze originale
                var excludedAdjacencyMatrix = excludeEdges(adjacencyMatrix, allEdgesCombinations[i]);

                // esplora tutte le esclusioni di parti del grafo
                exploreAllExclusions(algorithm, startNodeId, endNodeId, excludedAdjacencyMatrix, mainShortestPaths[i], secondShortestPaths, mainShortestPaths);
            }
        }
        
    }
    
    // ottengo per tutte le soluzioni il percorso effettivo nella struttura visualizzata a video - indici e etichette non coincidono
    mainShortestPaths.forEach(shortestPath => {
        shortestPath.path = shortestPath.path.map(nodeIndex => getNodeLabelByIndex(nodeIndex - 1));
    });

    secondShortestPaths.forEach(shortestPath => {
        shortestPath.path = shortestPath.path.map(nodeIndex => getNodeLabelByIndex(nodeIndex - 1));
    });
    

    // unisco le soluzioni
    let shortestPath = mainShortestPaths.concat(secondShortestPaths);


    if (debug) {
        // calcola il tempo trascorso
        var endTime = new Date();
        var executionTime = endTime - startTime;

        // visualizza il tempo trascorso
        console.log("Tempo di esecuzione:", executionTime, "millisecondi");
    }


    return shortestPath.length > 0 ? shortestPath : null; // Restituisci tutti i percorsi minimi trovati
}


/**
 * funzione ausiliaria per eseguire l'algoritmo di Dijkstra
 * 
 * @param {number} startNodeId, identificativo del nodo di partenza
 * @param {number} endNodeId, identificativo del nodo di arrivo
 * @param {Array} adjacencyMatrix, matrice delle adiacenze rapprensentante il grafo
 * @returns {object}, la soluzione trovata dall'algoritmo
 */
function dijkstraHelper(startNodeId, endNodeId, adjacencyMatrix) {
    if(startNodeId === endNodeId)   return { path: [startNodeId+1], cost: 0 };

    // inizializzazione delle variabili necessarie per l'algoritmo di Dijkstra
    var n = adjacencyMatrix.length; // numero di nodi nel grafo
    var visited = new Array(n).fill(false); // array per tenere traccia dei nodi visitati
    var distance = new Array(n).fill(Infinity); // array per memorizzare le distanze minime
    var previous = new Array(n).fill(null); // array per memorizzare i nodi precedenti nel percorso

    // imposta la distanza del nodo di partenza a 0
    distance[startNodeId] = 0;

    // eseguo l'algoritmo di Dijkstra
    for (var i = 0; i < n; i++) {
        var minDistance = Infinity; // distanza minima iniziale
        var minIndex = -1; // indice del nodo con distanza minima

        // trova il nodo non visitato con la distanza minima
        for (var j = 0; j < n; j++) {
            if (!visited[j] && distance[j] < minDistance) {
                minDistance = distance[j];
                minIndex = j;
            }
        }

        // se non ci sono più nodi da visitare o se è stato trovato il nodo di destinazione, esci
        if (minIndex === -1 || minIndex === endNodeId) {
            break;
        }

        // segna il nodo corrente come visitato
        visited[minIndex] = true;

        // aggiorna le distanze dei nodi adiacenti non visitati
        for (var k = 0; k < n; k++) {
            if (!visited[k] && adjacencyMatrix[minIndex][k] !== Infinity) {
                var alt = distance[minIndex] + adjacencyMatrix[minIndex][k];
                if (alt < distance[k]) {
                    distance[k] = alt;
                    previous[k] = minIndex;
                }
            }
        }
    }

    var current = endNodeId;
    var cost = distance[current];
    var shortestPath = [];

    if ( previous[current] !== null && previous[current] !== undefined ) {
        while ( current !== null && current !== undefined ) {
            shortestPath.unshift(current + 1);
            current = previous[current];
        }
    }

    return { path: shortestPath, cost: cost };
}


/**
 * funzione ausiliaria per eseguire l'algoritmo di Bellman Ford
 * 
 * @param {number} startNodeId, identificativo del nodo di partenza
 * @param {number} endNodeId, identificativo del nodo di arrivo
 * @param {Array} adjacencyMatrix, matrice delle adiacenze rapprensentante il grafo
 * @returns {object}, la soluzione trovata dall'algoritmo
 */
function bellmanfordHelper(startNodeId, endNodeId, adjacencyMatrix, firstExecution = false){
    if(startNodeId === endNodeId)   return { path: [startNodeId+1], cost: 0 };

    // inizializzazione delle variabili necessarie per l'algoritmo di Dijkstra
    var n = adjacencyMatrix.length; // numero di nodi nel grafo
    var distance = new Array(n).fill(Infinity); // array per memorizzare le distanze minime
    var previous = new Array(n).fill(null); // array per memorizzare i nodi precedenti nel percorso

    // imposta la distanza del nodo di partenza a 0
    distance[startNodeId] = 0;
    
    // aseguo l'algoritmo di Bellman Ford
    for (var i = 0; i < n-1; i++) {
        for (var j = 0; j < adjacencyMatrix.length; j++) {
            for (var k = 0; k < adjacencyMatrix[0].length; k++) {
                // se non si tratta dello stesso nodo valuto la distanza corrente
                if(k !== j){
                    var tempDistance = distance[j] + adjacencyMatrix[j][k]
                    // "rilasso" la distanza corrente se confrontata con quella ricavata dalla matrice risulta minore
                    if(tempDistance < distance[k] ){
                        // aggiorno la distanza
                        distance[k] = tempDistance;
                        // memorizzo il precedente
                        previous[k] = j;
                    }
                }
            }
        }
    }


    // controllo che non siano predenti cicli negativi valutando nuovamente le distanze
    var i = 0, j = 0;
    var anyNegativeCycle = false;
    while(i<adjacencyMatrix.length && j < adjacencyMatrix[0].length && !anyNegativeCycle)
    {
        // se risulta conveniente aggiornare ancora, probabilmente nel grafo è presente un ciclo negativo
        if (i !== j && distance[i] + adjacencyMatrix[i][j] < distance[j]) {
            if(firstExecution) {
                alert("Graph contains a negative-weight cycle");
            }
            anyNegativeCycle = true;
        }
        
        if(j == adjacencyMatrix[0].length-1) {
            j = 0;
            i++;
        } else {
            j++;
        }
    }

    var current = endNodeId;
    var cost = distance[current];
    var shortestPath = [];

    if ( !anyNegativeCycle && previous[current] !== null && previous[current] !== undefined ) {
        while ( current !== null && current !== undefined ) {
            shortestPath.unshift(current + 1);
            current = previous[current];
        }
    }

    return (!anyNegativeCycle) ? { path: shortestPath, cost: cost } : {path: null, cost: Infinity};
}


/**
 * la funzione esclude da una matrice delle adiacenze delle adiacenze uno o più insiemi di collegamenti 
 * 
 * @param {Array} adjacencyMatrix, la matrice delle adiacenze
 * @param {Object} edges, i collegamenti da escludere dalla matrice delle adiacenze
 * @returns {Array} la matrice delle adiacenze con i collegamenti esclusi
 */
function excludeEdges(adjacencyMatrix, edges) {
    let excludedMatrix = adjacencyMatrix.map(function(row) {
        return row.slice(); // copia la matrice delle adiacenze originale
    });

    for (let i = 0; i < edges.length; i++) {
        let edge = edges[i];
        for (let j = 1; j < edge.length; j++) {
            let from = edge[j - 1] - 1;
            let to = edge[j] - 1;
            if (from >= 0 && from < excludedMatrix.length && to >= 0 && to < excludedMatrix.length) {
                excludedMatrix[from][to] = Infinity;
                // se il grafo non è orientato, aggiungi l'arco inverso solo se non esiste già un arco diretto
                if (!isOriented && adjacencyMatrix[to][from] === Infinity) {
                    excludedMatrix[to][from] = Infinity;
                }
            }
        }
    }

    return excludedMatrix;
}


/**
 * la funzione confronta due array e ne comunica il risultato
 * 
 * @param {Array} arr1, array con cui effettuare il confronto
 * @param {Array} arr2, array con cui effettuare il confronto 
 * @returns {boolean} true se gli array sono uguali, false altrimenti
 */
function arraysEqual(arr1, arr2) {
    // per confrontare i due array utilizzo il metodo stringify() che converte un oggetto JS nella sua corrispettiva stringa in formato JSON
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}


/**
 * la funzione convalida l'unicità di un percorso tra un insieme di percorsi
 * 
 * @param {Array} toValidate, il percorso per cui si effettua la convalida
 * @param {Array} solutions, le soluzioni con le quali confrontare il percorso da controllare
 * @returns {boolean} true se il percorso fornito non è presente nelle soluzioni, false altrimenti
 */
function isSolutionUnique(toValidate, solutions){
    if(solutions.length === 0)  return true;

    for(let i=0; i<solutions.length; i++){
        if( arraysEqual(toValidate, solutions[i]) ) return false;
    }

    return true;
}


/**
 * funzione ricorsiva per applicare l'algoritmo di ricerca a tutte le versioni delle matrici di adiacenza a cui vengono sottratte le combinazioni della soluzione specificata
 * 
 * @param {Function} algorithm, l'algoritmo di ricerca da applicare
 * @param {number} startNodeId, identificativo del nodo di partenza
 * @param {number} endNodeId, identificativo del nodo di arrivo
 * @param {Array} adjacencyMatrix, matrice delle adiacenze
 * @param {Array} firstSolution, soluzione da dover scomporre in combinazioni
 * @param {Array} shortestPaths, insieme delle soluzioni trovare
 * @param {Array} mainShortestPaths, soluzioni che non condividono collegamenti con le altre
 */
function exploreAllExclusions(algorithm, startNodeId, endNodeId, adjacencyMatrix, firstSolution, shortestPaths, mainShortestPaths) {
    // trovo tutte le possibili combinazioni per i nodi adiacenti nel percorso da esplorare
    let allEdgesCombinations = findAllPathCombinations(firstSolution.path);
    
    // esplora tutte le possibili esclusioni dei collegamenti della prima soluzione
    for (var i = 0; i < (allEdgesCombinations.length); i++) {
        // crea una copia della matrice delle adiacenze originale
        var excludedAdjacencyMatrix = excludeEdges(adjacencyMatrix, allEdgesCombinations[i]);

        // esegui l'algoritmo con la matrice delle adiacenze esclusa delle combinazioni correnti
        var currentSolution = algorithm(startNodeId, endNodeId, excludedAdjacencyMatrix);

        // se il costo del percorso corrente è uguale al costo della prima soluzione, aggiungi il percorso trovato
        if (currentSolution.cost === firstSolution.cost && isSolutionUnique(currentSolution, shortestPaths.concat(mainShortestPaths))) {
            shortestPaths.push({ path: currentSolution.path, cost: currentSolution.cost });

            // applico la ricerca anche per la soluzione trovata
            exploreAllExclusions(algorithm, startNodeId, endNodeId, excludedAdjacencyMatrix, currentSolution, shortestPaths, mainShortestPaths)
        }
    }
}


/**
 * la funzione trova tutte le combinazioni per le coppie di nodi adiacenti di un percorso e con ogni lunghezza possibile
 * 
 * @param {Array} shortestPath, il percorso su cui vengono effettuate le elaborazioni
 * @param {boolean} excludeLast, opzione per escludere l'ultima sequenza di combinazioni di lunghezza pari al numero di coppie
 * @returns {Array} le combinazio trovate dalle coppie di nodi adiacenti nel percorso
 */
function findAllPathCombinations(shortestPath, excludeLast = true) {
    if (shortestPath.length === 0) return null;

    let pairs = [];

    // trova tutte le coppie adiacenti nel percorso più breve
    for (let i = 0; i < shortestPath.length - 1; i++) {
        pairs.push([shortestPath[i], shortestPath[i + 1]]);
    }

    // trova tutte le combinazioni possibili delle coppie adiacenti
    let combinations = [];

    for (let i = 0; i < (pairs.length-((excludeLast) ? 1 : 0)); i++) {
        let tempCombinations = [];
        matrixPermutationsFinder(pairs, i+1, tempCombinations);
        combinations = combinations.concat(tempCombinations);
    }

    return combinations;
}


/**
 * la funzione trova per un vettore il corrispettivo indice nella matrice di appartenenza
 * 
 * @param {Array} matrix, matrice nella quale cercare
 * @param {Array} rowToFind, vettore per cui ricercare la corrispondenza
 * @returns {number} l'indice del vettore nella matrice o -1 in caso di mancata corrispondenza
 */
function findRowIndex(matrix, rowToFind) {
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i].toString() === rowToFind.toString()) {
            return i; // restituisce l'indice della riga se trovata
        }
    }
    return -1; // restituisce -1 se la riga non è stata trovata
}


/**
 * la funzione ricorsiva che trova tutte le combinazioni senza ripetizione di una selezione di numeri
 * 
 * @param {Array} solution, array nel quale andranno le combinazioni trovate
 * @param {Array} actual, è la combinazione che viene costruita dalla funzione
 * @param {Array} C, array di numeri rappresentanti i campioni
 * @param {number} l, lunghezza di ogni combinazione 
 * @returns {number} -1 incaso di incompatibilità tra la dimensione dei campioni e la lunghezza delle combinazioni
 */
function matrixPermutationsFinder(C, l, solution, actual = []){
    if(C.length < l)   return -1;

    if(actual.length < l){
        let lastElement = (actual.length === 0) ? 0 : (findRowIndex(C, (actual[actual.length-1]))+1);

        let offset = C.length - lastElement; // calcolo lo spiazamento tra la dimenione e l'ultimo numero inserito
        let actualOffset = offset - (l - actual.length) + 1; // considero la posizione dell'elemento nel calcolo dell'offset

        if (actualOffset > 1) {

            for (let i=0; i<actualOffset; i++) {
                matrixPermutationsFinder(C, l, solution, actual.concat([C[lastElement+i]]))
            }

        } else {

            for (let i=0; i<offset; i++) {
                actual.push(C[lastElement+i]);
            }

            solution.push(actual);
        }


    } else {
        solution.push(actual);
    }
}


/////////////////////////
//////// codice per la card delle regole visualizzata dopo il caricamento
/////////////////////////


// indice della regola visualizzata
var currentRuleIndex = 0;


// definisco le regole del programma 
var desktopRules = [
    "1. Use \"backspace\" to remove selected nodes and edges.",
    "2. You can change the weight of edges by double-clicking on them and selecting the correct value.",
    "3. Add more nodes by double-clicking on the sheet.",
    "4. You can connect nodes by first selecting the source node with a double click, and then clicking on the destination node.",
    "5. When you are ready to start, press \"Enter\" and view the results of your algorithm."
];

var mobileRules = [
    "1. You can change the weight of edges by double-tapping on them and selecting the correct value.",
    "2. Add more nodes by double-tapping on the sheet.",
    "3. You can connect nodes by first selecting the source node with a double tap, and then tapping on the destination node."
];


/**
 * funzione che permette di visualizzare il tag html che oscura la vista di tutta la pagina
 */
function showOverlay() {
    // ottengo il riferimento nel documento del tag
    var overlay = document.querySelector('.page-overlay');
    // rendo visibile l'elemento
    overlay.style.display = 'block';
}


/**
 * funzione che permette di nascondere il tag html che oscura la vista della pagina
 */
function hideOverlay() {
    // ottengo il riferimento nel documento del tag
    var overlay = document.querySelector('.page-overlay');
    // nascondo l'elemento
    overlay.style.display = 'none';
}


/**
 * funzione per mostrare l'alert delle regole
 * 
 * @returns se nella sessione del browser è presente l'oggetto "dontShowMore"
 */
function showAlert() {
    // rendo visibile l'alert
    var alert = document.querySelector('.alert');
    alert.style.display = 'flex';

    // visualizzo le regole
    displayRule()

    // mostro l'ombra di sfondo
    showOverlay();
}


/**
 * funzione per nascondere l'alert
 */
function closeAlert() {
    // nascondo l'alert
    var alert = document.querySelector('.alert');
    alert.style.display = 'none';

    // rimuovo l'ombra di sfondo
    hideOverlay();
}


/**
 * funzione per passare alla prossima regola
 */
function nextRule() {
    // incremento l'indice
    currentRuleIndex++;
    // visulizzo le regole
    displayRule();
}


/**
 * funzione per tornare alla regola precedente
 */
function previousRule() {
    // decremento l'indice
    currentRuleIndex--;
    // visualizzo le regole
    displayRule();
}


/**
 * la funzione costruisce e formatta l'alert
 */
function displayRule() {
    // determino quali regole visualizzare a seconda della tipologia di dispositivo
    var rules = isMobile ? mobileRules : desktopRules;

    // ottengo il riferimento al tag della regola e ne attribuisco il contenuto
    var ruleContent = document.getElementById('rule-content');
    ruleContent.innerHTML = "<p>" + rules[currentRuleIndex] + "</p>";

    // ottengo i riferimenti dei bottoni
    var prevButton = document.querySelector('.alert-controls button:first-child');
    var nextButton = document.querySelector('.alert-controls button:nth-child(2)');

    // nascondo il bottone "previous" se la regola visualizzata è la prima
    prevButton.disabled = currentRuleIndex === 0 ? true : false;

    // nascondo il bottone "next" se la regola visualizzata è l'ultima
    nextButton.disabled = currentRuleIndex === rules.length - 1 ? true : false;
}


document.addEventListener('DOMContentLoaded', () => {
    // controllo se nella sessione attuale è stato selezionata l'opzione "don't show more"
    var dontShowMore = sessionStorage.getItem("dontShowMore");

    // se non risulta presente mostro l'alert
    if (dontShowMore !== "true") {
        // mostro l'alert
        showAlert();
    }

    // definisco il comportamento della checkbox "don't show more"
    var dontShowCheckbox = document.getElementById("dontShowCheckbox");
    // ad ogni cambiamento di stato della checkbox valuto se salvare o rimuovere la preferenza
    dontShowCheckbox.addEventListener("change", function() {
        if (this.checked) {
            // salvo la preferenza in sessione
            sessionStorage.setItem("dontShowMore", "true");
        } else {
            // rimuovo la preferenza dalla sessione
            sessionStorage.removeItem("dontShowMore");
        }
    });
});


/////////////////
///////// attribuisco il comportamento ai bottoni per il salvataggio
/////////////////

function adjacencyMatrixStringify(adjacencyMatrix) {
    let matrixStringify = "\t"

    adjacencyMatrix.forEach((_, index) => { matrixStringify += getNodeLabelByIndex(index) + ".\t\t"; });
    matrixStringify += "\n";
    adjacencyMatrix.forEach((row, index) => {
        matrixStringify += getNodeLabelByIndex(index) + ".\t";
        row.forEach( element => { matrixStringify += ("" + element + ((element === Infinity) ? "\t" : "\t\t"))});
        matrixStringify += "\n";
    });

    return matrixStringify;
}

function saveMatrix(){
    const adjacencyMatrix = buildAdjacencyMatrix();
    let matrixStringify = adjacencyMatrixStringify(adjacencyMatrix);
    // crea il contenuto del file HTML con il testo formattato - i file in formato txt non rispettano la formattazione
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${"matrix adjancecy salce"}</title>
    </head>
    <body>
    <pre>${matrixStringify}</pre>
    </body>
    </html>
        `;

    // Creazione del Blob
    const file = new Blob([html], { type: 'text/html' });

    // Creazione dell'URL del Blob
    const fileURL = URL.createObjectURL(file);

    // Creazione di una nuova scheda con l'URL del file
    window.open(fileURL, '_blank');

    // Creazione del link per il download del file
    const downloadLink = document.createElement("a");
    downloadLink.href = fileURL;
    downloadLink.download = "adjacency-matrix.htm";

    // Simulazione del clic sul link per il download del file
    downloadLink.click();

    // Revoca l'URL del Blob
    URL.revokeObjectURL(fileURL);
}

// comportamento del bottone per il salvataggio della configurazione

function saveConf() {
    const allNodes = nodes.get();
    const allEdges = edges.get();
    const configurations = [allNodes, allEdges]
    const confStringify = JSON.stringify(configurations);

    const link = document.createElement("a");
    const file = new Blob([confStringify], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "pathfinder-conf.json";
    link.click();
    URL.revokeObjectURL(link.href);
}

// comportamento del bottone per il salvataggio della configurazione

function importConf() {
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = '.json';
    input.style.display = 'none';
    
    input.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
        leggiFile(file);
        } else {
        console.error('Nessun file selezionato.');
        }
    });

    document.body.appendChild(input);
    input.click();
}

function leggiFile(file) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const contenuto = event.target.result;
        try {
            const configurations = JSON.parse(contenuto);

            console.log('Oggetto JSON:', configurations);

            const allNodes  = configurations[0];
            const allEdges  = configurations[1];

            removeAllNodes();

            // aggiungo i nodi e gli archi al grafo
            nodes.add(allNodes);
            edges.add(allEdges);

            clearHighlight();
            fitGraph();

        } catch (error) {
          alert('Errore nella conversione del testo in JSON:', error);
        }
    };
    
    reader.readAsText(file);
}