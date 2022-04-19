import { render, screen, within } from '@testing-library/react';
import CustomTable from './CustomTable';
import { prepareData } from "../helpers/helpers";
import React from "react";

const rawData = [
    { name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled' },
    { name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available' },
    { name: 'uxtheme.dll', device: 'Lannister', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available' },
    { name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled' },
    { name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled' },
]
const initialData = prepareData(rawData);

const showIconOn = {
    header: false,
    subheader: false,
    data: {
        columnId: 'status',
        icon: <div className='colored-circle' />,
        showOn: 'available'
    }
}

test('Table rendered', () => {
    const { container } = render(<CustomTable data={initialData}
                     rowSelect={true}
                     selectedRows={[]}
                     setSelectedData={() => {}}
                     hiddenColumn={['id']}
                     showIconOn={showIconOn} />);
    expect(container.firstChild).toBeTruthy();
})

test('has a table element with checkbox selection', () => {
    const { getByTestId } = render(<CustomTable data={initialData}
                                                   rowSelect={true}
                                                   selectedRows={[]}
                                                   setSelectedData={() => {}}
                                                   hiddenColumn={['id']}
                                                   showIconOn={showIconOn} />);
    const table = getByTestId('table');
    const selectAll = getByTestId('selectAll');
    expect(table).toBeTruthy();
    expect(selectAll).toBeTruthy();
    expect(screen.getByRole('table')).toBeTruthy();
});

test('has a table element without checkbox selection', () => {
    const { queryByTestId } = render(<CustomTable data={initialData}
                                                rowSelect={false}
                                                selectedRows={[]}
                                                setSelectedData={() => {}}
                                                hiddenColumn={['id']}
                                                showIconOn={{}} />);
    expect(queryByTestId(/selectAll/i)).toBeNull();
    expect(queryByTestId(/selectRow/i)).toBeNull();

});

test('has a table element with icon', () => {
    const { getAllByTestId } = render(<CustomTable data={initialData}
                                                rowSelect={false}
                                                selectedRows={[]}
                                                setSelectedData={() => {}}
                                                hiddenColumn={['id']}
                                                showIconOn={showIconOn} />);
    const icon = getAllByTestId('TDWithIcon');
    expect(icon).toBeTruthy();
});

test('has a table element without icon', () => {
    const { getAllByTestId } = render(<CustomTable data={initialData}
                                                   rowSelect={false}
                                                   selectedRows={[]}
                                                   setSelectedData={() => {}}
                                                   hiddenColumn={['id']}
                                                   showIconOn={showIconOn} />);
    const icon = getAllByTestId('TDWithoutIcon');
    expect(icon).toBeTruthy();
});

test('has a table with 5 rows', () => {
    const { findByRole } = render(<CustomTable data={initialData}
                                                   rowSelect={false}
                                                   selectedRows={[]}
                                                   setSelectedData={() => {}}
                                                   hiddenColumn={['id']}
                                                   showIconOn={showIconOn} />);
        const tbody = findByRole('tbody');
        expect(tbody).toHaveLength(1);
        const rows = tbody.findAllByRole('tr');
        expect(rows).toHaveLength(initialData.length);

});
