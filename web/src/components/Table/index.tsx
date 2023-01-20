import React from "react";
import MaterialTable, {
  MaterialTableProps,
  MTablePagination,
} from "material-table";

type TableProps = MaterialTableProps<any> & {
  selection?: boolean;
  pageSize?: number;
  header?: boolean;
  columnsButton?: boolean;
  exportButton?: boolean;
  exportCsv?: (columns: any[], renderData: any[]) => void;
  search?: boolean;
  toolbar?: boolean;
  showTextRowsSelected?: boolean;
  showTitle?: boolean;
  emptyDataSourceMessage?: string;
  deleteText?: string;
  headerStyle?: React.CSSProperties;
};

export function Table(props: TableProps) {
  return (
    <MaterialTable
      {...props}
      title={props.title || ""}
      columns={props.columns}
      data={props.data}
      style={{
        boxShadow: "none",
        border: "none",
        fontFamily: "Montserrat",
        ...props.style,
      }}
      isLoading={props.isLoading}
      actions={props.actions}
      onRowClick={props.onRowClick}
      options={{
        sorting: true,
        selection: props.selection,
        selectionProps: () => ({
          color: "primary",
          backgroundColor: "primary",
        }),
        pageSize: props.pageSize || 10,
        header: typeof props.header === "boolean" ? props.header : true,
        columnsButton:
          typeof props.columnsButton === "boolean"
            ? props.columnsButton
            : false,
        // exportButton:
        //   typeof props.exportButton === "boolean" ? props.exportButton : false,
        // exportCsv: props.exportCsv,
        search: props.search || false,
        pageSizeOptions: [5, 10, 20],
        actionsColumnIndex: -1,
        headerStyle: props.headerStyle,
        toolbar: typeof props.toolbar === "boolean" ? props.toolbar : true,
        showTextRowsSelected:
          typeof props.showTextRowsSelected === "boolean"
            ? props.showTextRowsSelected
            : false,
        showTitle:
          typeof props.showTitle === "boolean" ? props.showTitle : true,

        ...props.options,
      }}
      detailPanel={props.detailPanel}
      components={{ Pagination: (props) => <MTablePagination {...props} /> }}
      localization={{
        header: {
          actions: "Ações",
        },
        body: {
          addTooltip: "Adicionar",
          emptyDataSourceMessage:
            props.emptyDataSourceMessage || "Nenhum resultado encontrado",
          editRow: {
            saveTooltip: "Salvar",
            cancelTooltip: "Cancelar",
            deleteText: props.deleteText || "Você deseja deletar essa linha?",
          },
        },
        toolbar: {
          showColumnsTitle: "Exibir colunas",
          showColumnsAriaLabel: "Exibir colunas",
          searchPlaceholder: "Pesquisar",
          addRemoveColumns: true,
          // exportTitle: "Exportar",
          nRowsSelected: "{0} linha(s) selecionada(s).",
        },
        pagination: {
          labelRowsSelect: "Linhas",
          firstTooltip: "Primeira página",
          previousTooltip: "Página anterior",
          nextTooltip: "Próxima página",
          lastTooltip: "Ultima página",
          labelDisplayedRows: "{from}-{to} de {count}",
          labelRowsPerPage: "Linhas por página",
        },
      }}
    />
  );
}
