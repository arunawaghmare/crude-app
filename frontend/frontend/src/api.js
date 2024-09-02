const BASE_URL = 'http://localhost:8080';

export const GetAllStudent = async (search = '',  limit = 5) => {
    const url =
        `${BASE_URL}/api/student?search=${search}&limit=${limit}`;
  
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const result = await fetch(url, options);
            const { data } = await result.json();
    
            return data;
        } catch (err) {
            return err;
        }
    }
    export const GetStudentDetailsById = async (id) => {
        const url =
            `${BASE_URL}/api/student/${id}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const result = await fetch(url, options);
            const { data } = await result.json();
            console.log(data);
            return data;
        } catch (err) {
            return err;
        }
    }
    
    export const DeleteStudentById = async (id) => {
        const url =
            `${BASE_URL}/api/student/${id}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const result = await fetch(url, options);
            const data = await result.json();
            console.log(data);
            return data;
        } catch (err) {
            return err;
        }
    }
    
    
    export const CreateStudent = async (stuObj) => {
        const url = `${BASE_URL}/api/student`;
        console.log('url ', url);
        
        const formData = new FormData();
    
        
        for (const key in stuObj) {
            formData.append(key, stuObj[key]);
        }
        // FormData handles the headers and content type
        const options = {
            method: 'POST',
            body: formData
        };
        try {
            const result = await fetch(url, options);
            const data = await result.json();
            return data;
        } catch (err) {
            return err;
        }
    };
    
    export const UpdateStudentById = async (stuObj, id) => {
        const url = `${BASE_URL}/api/student/${id}`;
        console.log('url ', url);
       
        const formData = new FormData();
    
        for (const key in stuObj) {
            formData.append(key, stuObj[key]);
        }
        const options = {
            method: 'PUT',
            body: formData
        };
        try {
            const result = await fetch(url, options);
            const data = await result.json();
            console.log('<---update--> ', data);
            return data;
        } catch (err) {
            return err;
        }
    };

