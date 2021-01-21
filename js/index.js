//////////////////////////////////////////////////////////////////////////////
/// import pattern of table and all elements information include groups from files
//////////////////////////////////////////////////////////////////////////////

import { elements } from "../elements/elements.js";
import { pattern } from '../elements/pattern.js';
import { exception, alkaliMetals, alkalineMetals, otherMetals, transitionMetals, lanthanoids, actinoids, metalloids, nonmetals, hologens, nobleGases, unknowElements } from '../elements/materialGroups.js';

//import { elementInfo } from '../js/func.js';

let tabelClass = document.getElementById('tabel');

//////////////////////////////////////////////////////////////////////////////
/// create div[es] to create table follow of pattern
//////////////////////////////////////////////////////////////////////////////

let tableArray = [];

for (let i = 0; i < pattern.length; i++){
    tableArray[i] = document.createElement('div');
    tabelClass.appendChild(tableArray[i]);
}

//////////////////////////////////////////////////////////////////////////////
///
//////////////////////////////////////////////////////////////////////////////

let line = 0;
let column = 0;

for (let ele in pattern){
    
    
    if (pattern[ele] === '0'){
        tableArray[ele].classList.add('empty');


    }else {
        
        tableArray[ele].classList.add('notempty');
        if (pattern[ele] != 't' && pattern[ele] != 'c') {
            tableArray[ele].classList.add('atomicnumber');
            
            let index = parseFloat(pattern[ele]) - 1;
            
            tableArray[ele].innerHTML = `
                <p class='atomnum'>${pattern[ele]}</p>
                <h2 title='${elements[index].name}'>
                ${elements[index].symbol}
                </h2>`;
                               
            tableArray[ele].querySelector('h2').addEventListener('click', () => {
                // console.log(tableArray[ele].classList[tableArray[ele].classList.length - 1])
                // returne atomic number & materialGroup CSS class
                
                elementInfo(pattern[ele], tableArray[ele].classList[tableArray[ele].classList.length - 1]);
            })
            
//////////////////////////////////////////////////////////////////////////////
/// Gave number each dav include column and title
//////////////////////////////////////////////////////////////////////////////  
            
        }else{
            tableArray[ele].classList.add('title');
            
            if (pattern[ele] == 't'){
                line++
                tableArray[ele].innerHTML = line;
                if (line === 9) tableArray[ele].innerHTML = '6*';
                if (line === 10) tableArray[ele].innerHTML = '7*';
            }
            
            if (pattern[ele] == 'c'){
                column++
                tableArray[ele].innerHTML = column;
            }            
        }

//////////////////////////////////////////////////////////////////////////////
/// Gave each dav include elements, groups of element classes
//////////////////////////////////////////////////////////////////////////////

        tableArray[ele].classList.add(checkMaterialGroup(pattern[ele]))
        
    }
}

//////////////////////////////////////////////////////////////////////////////
/// Open over Layer for each element
//////////////////////////////////////////////////////////////////////////////

const elementInfo = (atomNum, materialGroup) => {
    //console.log(atomNum, materialGroup)
    const chemicalElement = elements[atomNum-1]
    const overlay = document.createElement('div')
  
    overlay.style.display = 'flex';
    overlay.style.height = '100vh';
    overlay.style.position = 'fixed';
    overlay.style.top = '0'
    overlay.style.bottom = '0'
    overlay.style.left = '0'
    overlay.style.right = '0'
    overlay.style.backgroundColor = 'rgba(0, 0, 0, .8)'
    
    overlay.innerHTML = `
        <section class='overlay'>
            <div class='overlay-title'>
                <div class='overlay-elementSymbol ${materialGroup}'>
                    <h1>${chemicalElement.symbol}</h1>
                </div>
                <div class='overlay-elementName'>
                    <span class='${materialGroup}-text'>${chemicalElement.name[0]}</span>${chemicalElement.name.slice(1, chemicalElement.name.length )}
                </div>
                <div class='shortinfo'>
                    <p>Atomic Number: 
                        <span class='${materialGroup}-text'>
                            ${chemicalElement.number}
                        </span>
                    </p>
                    <p>Period: 
                        <span class='${materialGroup}-text'>
                            ${chemicalElement.period}
                        </span>
                    </p>
                    <p>Group: 
                        <span class='${materialGroup}-text'>
                            ${chemicalElement.xpos}
                        </span>
                    </p>
                    <p>Phase: 
                        <span class='${materialGroup}-text'>
                            ${chemicalElement.phase}
                        </span>
                    </p>
                    <p>Material Group: <br>
                        <span class='${materialGroup}-text rightside'>
                            ${materialGroup.toUpperCase()}
                        </span>
                    </p>
                </div>
                <div class='x' id='x'>
                    <p>X</p>
                </div>
            </div>
            <div class='otherInfo'>
                <p>Material Category: <strong>${chemicalElement.category}</strong></p>
                
               
                
                <div class='lastLayer'>
                    <div class='finalInfo'>
                        <p>Boiling point: ${convertTemp(chemicalElement.boil)}</p>
                        <p>Melting point: ${convertTemp(chemicalElement.melt)}</p>
                        <p>Atomic Mass: ${checkNullData(chemicalElement.atomic_mass, '<em>A</em><sub>r, std</sub>(H)')}</p>
                        <p>Density: ${checkNullData(chemicalElement.density, 'g/l')}</p>
                        <p>Molar Heat Capacity: ${checkNullData(chemicalElement.molar_heat, 'J/(mol·K)')}</p>
                    </div>
                    <div class='atomLayer'>
                        <div>Atom Shell:</div>
                        <div class='layers'>
                            ${atomLayers(chemicalElement.shells)}
                        </div>
                    </div>

                </div>
                
                <div class='elec'>
                    <p>Electron Configuration: <br>
                        Electron Configuration Semantic: 
                    </P>
                    <p><strong>${chemicalElement.electron_configuration}
                        </strong>
                        <br>
                        <strong>${chemicalElement.electron_configuration_semantic}
                        </strong>
                    </p>
                </div>
            </div>
            
            
            <div class='summary'>
                <div>
                    <h1>Summary: </h1>
                    <p>${chemicalElement.summary}</p>
                </div>
                <div>
                    <p>For more information 
                        <a href='${chemicalElement.source}' 
                        alt='${chemicalElement.name}' target='_blank'>click here
                        </a> ...
                    </p>
                </div>
            </div>
            
            
            <div class='prv-nxt'>
                <div class='btn disable' id='prv'>
                    <p><</p>
                </div>
                <div class='btn disable' id='nxt'>
                    <p>></p>
                </div>
            </div>
        </section>
    `



/////////////////////////////////////////////
/// add close, next & previos key on layer
/////////////////////////////////////////////    

    const xClose = overlay.querySelector('.x')
    const prv = overlay.querySelector('#prv')
    const nxt = overlay.querySelector('#nxt')


    if (chemicalElement.number > 1) {
        prv.classList.remove('disable')
    }
    if (chemicalElement.number < 119) {
        nxt.classList.remove('disable')
    }
    
    
    xClose.addEventListener('click', event => {
        overlay.remove()
    })
    
    prv.addEventListener('click', event => {
        if (atomNum > 1) {
            atomNum--
            overlay.remove()
            elementInfo(atomNum, checkMaterialGroup(atomNum))
        }
    })
    
    nxt.addEventListener('click', event => {
        if (atomNum < 119) {
            atomNum++
            overlay.remove()
            elementInfo(atomNum, checkMaterialGroup(atomNum))
        }
    })
    
    document.body.appendChild(overlay)
};

//////////////////////////////////////////////////////////////////////////////
/// Atom Layer
//////////////////////////////////////////////////////////////////////////////

function atomLayers(shells) {
    
    let html = "<div class='seed'><p>Seed</p></div>";
    if (shells.length >= 1) html += "<div class='layer1'><p>" + shells[0] + "</p></div>";
    if (shells.length >= 2) html += "<div class='layer2'><p>" + shells[1] + "</p></div>";
    if (shells.length >= 3) html += "<div class='layer3'><p>" + shells[2] + "</p></div>";
    if (shells.length >= 4) html += "<div class='layer4'><p>" + shells[3] + "</p></div>";
    if (shells.length >= 5) html += "<div class='layer5'><p>" + shells[4] + "</p></div>";
    if (shells.length >= 6) html += "<div class='layer6'><p>" + shells[5] + "</p></div>";
    if (shells.length >= 7) html += "<div class='layer7'><p>" + shells[6] + "</p></div>";
    if (shells.length >= 8) html += "<div class='layer8'><p>" + shells[7] + "</p></div>";

    return html

}

//////////////////////////////////////////////////////////////////////////////
/// Check null data
//////////////////////////////////////////////////////////////////////////////

function checkNullData (data, unit) {
    if (!data) return 'UnKnown'
    let html = '';
    html = '<strong>' + data + '</strong> ' + unit
    return html
}

//////////////////////////////////////////////////////////////////////////////
/// Convert temprture to C & F
//////////////////////////////////////////////////////////////////////////////

function convertTemp(degree) {
    if (!degree) return 'UnKnown'
    let html = '';
    html = '<strong>' + degree + '</strong> K, <strong>' + (degree - 273.15).toFixed(2) + '</strong> ℃, <strong>' + (((degree - 273.15) * 1.8) + 32).toFixed(2) + '</strong> ℉'
    return html
}

//////////////////////////////////////////////////////////////////////////////
/// Check material group
//////////////////////////////////////////////////////////////////////////////

function checkMaterialGroup(atomNumber) {
    let number = atomNumber.toString()
    
    if (exception.includes(number)) return 'exception'
    if (alkaliMetals.includes(number)) return'alkaliMetals'
    if (alkalineMetals.includes(number)) return 'alkalineMetals'
    if (otherMetals.includes(number)) return 'otherMetals'
    if (transitionMetals.includes(number)) return 'transitionMetals'
    if (lanthanoids.includes(number)) return 'lanthanoids'
    if (actinoids.includes(number)) return 'actinoids'
    if (metalloids.includes(number)) return 'metalloids'
    if (nonmetals.includes(number)) return'nonmetals'
    if (hologens.includes(number)) return 'hologens'
    if (nobleGases.includes(number)) return 'nobleGases'
    if (unknowElements.includes(number)) return 'unknowElements'
    
}
