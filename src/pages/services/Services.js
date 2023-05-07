import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from "../../components/table/table"
import AdminSidebar from "../../components/adminSidebar/adminSidebar";
import {servicesAction} from "../../actions/services/servicesAction"
import CreateServiceModal from "../../components/modals/create_service";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#FFFFFF",
            fontFamily: "Ubuntu",
            fontWeight: "inherit",
          },
          footer: {
            border: 0,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            // fontFamily: 'Ubuntu',
            color: "black",
            justifyContent: "center",
            // fontWeight: 'bold',
          },
        },
      },

      MUIDataTableSelectCell: {
        styleOverrides: {
          headerCell: {
            backgroundColor: "#5f6062",
            color: "wh",
          },
        },
      },

      MUIDataTable: {
        styleOverrides: {
          responsiveBase: {
            position: "relative",
            height: "auto",
            borderRadius: "18px",
            border: "1px solid #f2f2f2",
            boxShadow: "0 0 6px 4px #efefef",
          },
        },
      },
      MUIDataTablePagination: {
        styleOverrides: {
          navContainer: {
            border: 0,
            boxShadow: "0 ",
          },
        },
      },
     
    },
  });

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10)

  const [createServiceModal, setCreateServiceModal] = useState(false);

  const closeCreateServiceModal = (e) => {
    e.preventDefault();
    setCreateServiceModal(false)
  }

  const getServices = () => {
    servicesAction({page,limit})
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setServices(res.data);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getServices();
  }, [createServiceModal,page,limit]);

  const columns = [
    {
     name: "sender",
     label: "SENDER",
     options: {
      filter: true,
      sort: false,
      setCellHeaderProps: () => ({ style: { minWidth: "180px", maxWidth: "180px", backgroundColor: 'white', color: 'black', fontSize: '0.9rem', lineHeight: 2.0} }),
     }
    },
    {
     name: "provider",
     label: "PROVIDER",
     options: {
      filter: true,
      sort: false,
      setCellHeaderProps: () => ({ style: { minWidth: "180px", maxWidth: "180px", backgroundColor: 'white', color: 'black', fontSize: '0.9rem', lineHeight: 2.0} }),
     }
    },
    {
     name: "status",
     label: "STATUS",
     options: {
      filter: true,
      sort: false,
      setCellHeaderProps: () => ({ style: { minWidth: "180px", maxWidth: "180px", backgroundColor: 'white', color: 'black', fontSize: '0.9rem', lineHeight: 2.0} }),
     }
    },
    {
     name: "country_code",
     label: "COUNTRY",
     options: {
      filter: true,
      sort: false,
      setCellHeaderProps: () => ({ style: { minWidth: "180px", maxWidth: "180px", backgroundColor: 'white', color: 'black', fontSize: '0.9rem', lineHeight: 2.0} }),
     }
    },
   ];

  const options = {
    filter: false,
    filterType: 'textField',
    responsive: 'standard',
    print: false,
    tableId: "03009226196169874",
    fixedHeader: true,
    fontFamily: 'Ubuntu',
    viewColumns: false,
    selectableRows: "none",
    fixedSelectColumn: true,
    tableBodyHeight: 'auto',
    enableNestedDataAccess: '.',
    elevation: 0,
    serverSide: true,
    page: page,
    count: 30,
    rowsPerPageOptions: [10, 20, 50],
    downloadOptions: {
      separator: ',',
      filename: 'Customers Summary.csv',
      filterOptions: {
        useDisplayedColumnsOnly: false, // it was true
        useDisplayedRowsOnly: false, // it was true
      },
    },
    onTableChange: (action, tableState) => {

      if (action === "changePage") {

        setIsLoaded(false);
        setPage(tableState.page+1);

      } else if (action === "changeRowsPerPage") {
        console.log("action not handled.", tableState);
        setIsLoaded(false);
        setLimit(tableState.rowsPerPage);
      }
      else {
        console.log("action not handled.");
      }
    },
    downloadFile: true,
    onDownload: (buildHead, buildBody, columns, data) => {
      let val = `${buildHead(columns)}${buildBody(data)}`.replace(/[^\x00-\x7F]/g, "").toString().trim();
      return val;
    },
   
    textLabels: {
      body: {
        noMatch: isLoaded ? "Sorry, no matching records exist in Suss"
          : <div >
            ......
          </div>,
        toolTip: "Sort",
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
      toolbar: {
        search: "Search A/C Number,Name or Payplans",
        downloadCsv: "Download Sender Ids Excel List",
        print: "Print customers",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      setFilterChipProps: () => {
        return {
          color: 'primary',
          variant: 'outlined',
          className: 'testClass123',
        };
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "record(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Records",
      },
    }
  }

  return (
    <AdminSidebar>
    <CreateServiceModal createServiceModal={createServiceModal} closeCreateServiceModal={closeCreateServiceModal}/>
    <h1 className="text-2xl text-black mb-6">All Sender Ids</h1>
    <h4 className="text-md text-gray-800 font-serif">A list of all the Sender Ids </h4>
    <div className="flex justify-end">
        <button
          type="button"
          className="text-white w-36 bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 mt-4 flex items-center mr-2"
          onClick={() =>setCreateServiceModal(true)}
        >
          <LibraryAddIcon />
          <p className="ml-4">Add Service</p>
        </button>
      </div>

    <div className="mt-4">
      <ThemeProvider theme={getMuiTheme()}>

        <Table columns={columns} options={options} data={services} />
      </ThemeProvider>
    </div>
    </AdminSidebar>
  );
};

export default AllServices;
