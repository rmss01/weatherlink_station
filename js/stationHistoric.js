let dataTable;
let dataTableIsInisialized = false;

const dataTableOptions = {
    dom: "Bfrtip",
    buttons: {
        dom:{
            button:{
                className: 'btn'
            }
        },
        buttons:[
            {
                extend: "excel",
                text: "Exportar Excel",
                className: "btn btn-outline-success",
                excelStyles: {                // Add an excelStyles definition
                    template: "header_blue",  // Apply the 'blue_medium' template
                }
            }
        ]},
    lengthMenu: [10, 20, 50, 100, 200],
    destroy: true,
    destroy: true,
    language: {
        "decimal": "",
        "emptyTable": "No hay datos disponibles en la tabla",
        "info": "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        "infoEmpty": "Mostrando 0 a 0 de 0 registros",
        "infoFiltered": "(filtrados desde _MAX_ registros totales)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ registros por página",
        "loadingRecords": "Cargando ...",
        "processing": "",
        "search": "Buscar:",
        "zeroRecords": "No se encontró ningún registro",
        "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
        },
        "aria": {
            "orderable": "Ordenar por ésta columna",
            "orderableReverse": "Invertir el órden por esta columna"
        }
    }
}

const initDataTable = async () => {
    if (dataTableIsInisialized) {
        dataTable.destroy();
    }

    await loadData();

    dataTable = $("#datatable").DataTable(dataTableOptions);
    dataTableIsInisialized = true;
}
const loadData = async () => {
    try {
        const response = await fetch("http://localhost:3003/stations-historic/178073");
        const data = await response.json();
        console.log(data);
        let contenido = ``;
        let tableHeaders = ``;
        let headers = ``;
        for (const property in data[0]) {
            headers += `<th>${property}</th>`
        }

        tableHeaders = `
            <tr>
                <td></td>
                ${headers}
            </tr>
        `;
        data.forEach((element, index) => {
            let cont = ``;
            for (const property in element) {
                cont += `<td>${element[property]}</td>`

            }
            contenido += `
                <tr>
                    <td></td>
                    ${cont}
                </tr>`;
        });
        const tableHead = document.getElementById("tableHead");
        tableHead.innerHTML = tableHeaders;
        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = contenido;
    } catch (error) {
        alert(error)
    }
}

window.addEventListener('load', async () => {
    initDataTable();
})