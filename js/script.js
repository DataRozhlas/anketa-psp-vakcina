import "./byeie"; // loučíme se s IE
import { h, render } from "preact";
/** @jsx h */

let host = 'https://data.irozhlas.cz/anketa-covid';
if (window.location.hostname === 'localhost') {
  host = 'http://localhost/anketa-psp-vakcina'
}

function printResps(obj) {
  if (obj.o1 === '') { obj.o1 = '<i>Bez odpovědi.</i>'}
  if (obj.o2 === '') { obj.o2 = '<i>Bez odpovědi.</i>'}
  if (obj.o3 === '') { obj.o3 = '<i>Bez odpovědi.</i>'}
  if (obj.o4 === '') { obj.o4 = '<i>Bez odpovědi.</i>'}
  return `<p><b>1.</b> ${obj.o1}</p><p><b>2.</b> ${obj.o2}</p><p><b>3.</b> ${obj.o3}</p><p><b>4.</b> ${obj.o4}</p>`
}

function onLoad(e) {
  const data = JSON.parse(e.target.response)
  render((
    <div id="anketa">
      {data.map(el => (
        <div className="respondent">
          <img className="portret" src={el.foto} alt={el.prij} />
          <div className="bio">
            <div className="jmeno">{`${el.jm} ${el.prij}`}</div>
            <div className="vek">{`${el.str} (${el.kom})`}</div>
          </div>
          <div className="odpoved" dangerouslySetInnerHTML={{ __html: printResps(el) }}></div>
        </div>
      ))}
    </div>
  ), document.getElementById("anketa-wrapper"))
}

const r = new XMLHttpRequest()
r.addEventListener("load", onLoad)
r.open("GET", host + "/data/data.json")
r.send()