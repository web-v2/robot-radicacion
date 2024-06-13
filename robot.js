const fs = require("fs/promises");
const path = require("path");
const { carpetas } = require("./listFacturas.js");
const { logError, logSuccess } = require("./helpers.js");

const radicadoNum = 656;
const destino = "./facturas";
const origenArchivo = `./radicados/${radicadoNum}.pdf`;

async function radicar() {
  for (const carpeta of carpetas) {
    const destinoCarpeta = path.join(destino, carpeta);
    const destinoArchivo = path.join(destinoCarpeta, `${radicadoNum}.pdf`);

    try {
      await fs.access(destinoCarpeta);
      await fs.copyFile(origenArchivo, destinoArchivo);
      await logSuccess(carpeta);
      console.log(`Radicado add en ${carpeta} correctamente.`);
    } catch (err) {
      console.error(`Error al copiar el archivo en ${carpeta}:`, err);
      await logError(carpeta, err);
    }
  }
}

radicar();
