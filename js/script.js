import "./byeie"; // loučíme se s IE
import { h, render } from "preact";
/** @jsx h */

let host = 'https://data.irozhlas.cz/anketa-psp-vakcina';
if (window.location.hostname === 'localhost') {
  host = 'http://localhost/anketa-psp-vakcina'
}

function printResps(obj) {
  if (obj.o2 === '') { obj.o2 = '<i>Bez odpovědi.</i>'}
  if (obj.o4 === '') { obj.o4 = '<i>Bez odpovědi.</i>'}
  return `<p><b>1.</b> ${obj.o2}</p><p><b>2.</b> ${obj.o4}</p>`
}

function onLoad(e) {
  const data = JSON.parse(e.target.response)
  render((
    <div id="anketa">
      {data.map(el => (
        <div className={'respondent ' + el.kom}>
          <img className="portret" src={el.foto} alt={el.prij} />
          <div className="bio">
            <div className="jmeno" id="jmeno">{`${el.jm} ${el.prij}`}</div>
            <div className="vek">{el.str}</div>
          </div>
          <div className="odpoved" dangerouslySetInnerHTML={{ __html: printResps(el) }}></div>
        </div>
      ))}
    </div>
  ), document.getElementById("anketa-wrapper"))
  
  let toHide = document.getElementsByClassName('sen')
  for (var i = 0; i < toHide.length; i++) {
    toHide[i].style.display='none';
  }

  document.getElementById('komora').addEventListener('change', (e) => {
    let toHide,
        toShow;
    if (e.target.value === 'sen') {
      //schovej PSP
      toHide = document.getElementsByClassName('psp')
      toShow = document.getElementsByClassName('sen')
    } else {
      toHide = document.getElementsByClassName('sen')
      toShow = document.getElementsByClassName('psp')
    }

    for (var i = 0; i < toHide.length; i++) {
      toHide[i].style.display='none';
    }
    for (var i = 0; i < toShow.length; i++) {
      toShow[i].style.display='';
    }
  })
  document.getElementById('name_search').addEventListener('input', (e) => {
    const jm = e.target.value;
    const ftr = document.getElementById('komora').value;
    const els = document.getElementsByClassName('respondent')

    for (var i = 0; i < els.length; i++) {
      // musi mit classu vybranou
      if (els[i].classList.contains(ftr)) {
        if (els[i].children[1].children[0].textContent.toLocaleLowerCase().includes(jm.toLocaleLowerCase())) {
          els[i].style.display='';
        } else {
          els[i].style.display='none';
        }
      }
    }
    
  })
}

const r = new XMLHttpRequest()
r.addEventListener("load", onLoad)
r.open("GET", host + "/data/data.json")
r.send()