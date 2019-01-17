$(document).ready(function() {
    var table=$('#example').DataTable({
      dom: 'Bfrtip',
      /**
       * Choose which columns you don't wish to show in the datatable.
       * Either by class name such as 'last-column' or by position such as 0
       * is the first position, similar to an indexed array.
       */
      columnDefs: [
            {
                targets: 'last-column',
                className: 'noVis'
            },
            {
                targets: 0,
                className: 'noVis'
            },

        ],
        /**
         * extend-> Functionality -> Make sure to see if the appropriate js file for the functionality is loaded.
         * text -> Name on button
         * exportOptions -> specifications for export, right now I've said 
         *                  don't include the last th element as that is 
         *                  the Actions field. We don't want the view and 
         *                  edit button in the exported report.
         */
      buttons: [
   {
        extend: 'copy',
        text: 'Copy Table',
        exportOptions: {
            columns: ':visible th:not(:last-child)'
        }
    },{
        extend: 'csv',
        text: 'Export CSV',
        exportOptions: {
            columns: ':visible th:not(:last-child)'
        }
    },{
        extend: 'excel',
        text: 'Export Excel',
        exportOptions: {
            columns: ':visible th:not(:last-child)'
        }
    },{
        extend: 'pdf',
        text: 'Export PDF',
        exportOptions: {
            columns: ':visible th:not(:last-child)'
        }
    },{
        extend: 'print',
        text: 'Print',
        exportOptions: {
            columns: ':visible th:not(:last-child)'
        }
    },{
            extend: 'colvis',
            text: 'Choose Columns',
            columns: ':not(.noVis)'
            }],
    });
    table.columns('.not-visible').visible( false, false );
    table.columns.adjust().draw( false ); 
  });