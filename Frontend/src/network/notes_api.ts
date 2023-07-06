import Notes from "../models/note";

async function fetchData(input: RequestInfo, init?:RequestInit ) {
    const response = await fetch(input,init);

    console.log(response)
    if(response.ok){
        return response;
    }else{
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchNote(): Promise<Notes[]> {
    const response = await fetchData("http://localhost:5000/api/user",{method: "GET", mode: 'cors'});
        return response.json();
        
}

export interface NoteInput {
    title:string,
    text:string
}
export async function createNote(note: NoteInput): Promise<Notes> {
    const response = await fetchData("http://localhost:5000/api/user",{
        method: "POST",
        mode:"cors",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(note),


    });
    return response.json();
}