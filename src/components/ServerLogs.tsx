import React, {useEffect, useState} from 'react';
import {IoMdArrowBack} from 'react-icons/io';
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";

function ServerLogs({setViewLogs} : any) {

    const columns = [
        { field: 'timestamp', headerName: 'Date-Time', width: 250 },
        { field: 'originalUrl', headerName: 'URL', width: 250 },
        { field: 'method', headerName: 'Method', width: 250 },
        { field: 'clientId', headerName: 'clientId', width: 200}
    ]
    const [logs, setLogs] = useState<any>([]);

    useEffect(() => {
        handleGetLogs();
    }, [logs])

    const handleGetLogs = () => {
        axios.get('http://localhost:3002/api/logs')
            .then(response => {
                setLogs(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleBack = () => {
        setViewLogs(false);
    }

    return (
        <div className="w-1/2 h-1/2 ml-auto mr-auto mt-16">
            <div className="w-full h-16 flex items-center space-x-2">
                <IoMdArrowBack />
                <h1 onClick={handleBack} className="hover:text-gray-400 text-xl">
                    Users
                </h1>
            </div>
            <DataGrid
                getRowId={(row : any) => row.clientId}
                rows={logs}
                columns={columns}
                pageSize={4}
                rowsPerPageOptions={[5]}
                autoPageSize={false}
            />
        </div>
    );
}

export default ServerLogs;