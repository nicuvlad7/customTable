import React, { useEffect } from 'react';
import './customTable.scss';
import downloadSvg from '../assets/download.svg'

const CustomTable = ({ data, rowSelect, setSelectedData, selectedRows = [], hiddenColumn, showIconOn }) => {
    const columns = data[0] && Object.keys(data[0]);
    const checkboxRef = React.useRef();

    const emptyList = () => {
        setSelectedData([]);
    }
    const selectAll = () => {
        setSelectedData(data.map(data => data.id));
    }
    const manageParentClick = () => {
        if(selectedRows.length === data.length) {
            emptyList();
        } else {
            selectAll();
        }
    }

    const manageData = (id) => {
        const currentData = [...selectedRows];
        const idx = currentData.indexOf(id);
        if (idx !== -1) {
            currentData.splice(idx, 1);
        } else {
            currentData.push(id);
        }
        setSelectedData(currentData);
    }

    useEffect(() => {
        if(!rowSelect) return;
        if(selectedRows.length && selectedRows.length < data.length) {
            checkboxRef.current.checked = false;
            checkboxRef.current.indeterminate = true;
        } else if (selectedRows.length === data.length) {
            checkboxRef.current.checked = true;
            checkboxRef.current.indeterminate = false;
        } else {
            checkboxRef.current.checked = false;
            checkboxRef.current.indeterminate = false;
        }
    }, [selectedRows]);

    const tableDataProcess = ({row, column}) => {
        if(showIconOn && showIconOn.data && showIconOn.data.columnId === column && showIconOn.data.showOn === row[column]) {
            return <td data-testid='TDWithIcon' key={`${row.id} + ${row.label}`} className='data-item'>{showIconOn.data.icon}{row[column]}</td>
        }
        return <td data-testid='TDWithoutIcon' key={`rowLabel ${row.id}  ${row[column]}`} className='data-item'>{row[column]}</td>
    }

    const prepareDownload = () => {
        let message = '';
        let warning = false;
        if (setSelectedData.length) {
            data.forEach(item => {
                if (selectedRows.indexOf(item.id) !== -1) {
                    if(item.status === 'scheduled') {
                        warning = true;
                    }
                    message = message + ' ' + item.path;
                }
            })
        }
        if (warning) {
            alert('You have selected to download a file that is already being processed. Please review your selection.')
        } else if(message){
            alert(message);
        }
    }

    return (
            <table data-testid='table' className='table' cellPadding={0} cellSpacing={0}>
                <thead data-testid='tableHead'>
                    <tr>
                        {rowSelect ? <th><input title='check all' data-testid='selectAll' ref={checkboxRef}  onClick={() => manageParentClick()} type={"checkbox"}/></th> : null }
                        {selectedRows.length ? (rowSelect ? <th  title='selected amount' data-testid='selectedAmount' className='selected-items-label'>Selected {selectedRows.length}</th> : null) : <th title='No items selected' data-testid='selectedAmount' className='selected-items-label'>No selected Items</th> }
                        {rowSelect ?
                            <th data-testid='downloadSelection'>
                                <span  className={`${selectedRows.length ? 'download-btn' : 'download-dsbl'}`}  onClick={prepareDownload} title='download' ><img alt="Tracking" src={downloadSvg} className="download-logo" /> Download </span>
                            </th> : null
                        }
                    </tr>
                    <tr>
                        {rowSelect ? (<th/>) : null }
                        {
                            data[0] && columns.map((heading, index) =>
                                hiddenColumn.indexOf(heading) !== -1 ? null : <th title={heading} key={`headerRow-${index}`} className='subheader'>{heading.charAt(0).toUpperCase() + heading.slice(1)}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.map((row,index) => (
                        <tr data-testid='dataRow' key={`bodyRow-${index}`} className={`${selectedRows.indexOf(row.id) !== -1 ? 'body__row--selected' : 'body__row'}`}>
                            { rowSelect ? <td className='selection-box'>
                                <input data-testid='selectRow' className='selection'  onClick={() => manageData(row.id)} type={"checkbox"} value={row.id} checked={selectedRows.indexOf(row.id) !== -1} />
                            </td> : null}
                                {columns.map((column) => (
                                    hiddenColumn.indexOf(column) !== -1 ? null : tableDataProcess({row, column})
                                    )
                                )}
                            </tr>
                        ))}
                    {!data.length ? <tr><td>No data can be rendered at the moment.</td></tr> : null }
                </tbody>
            </table>
            );
}

export default CustomTable;