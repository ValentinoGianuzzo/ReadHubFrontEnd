import {useState, useEffect} from "react";
export default function FetchData() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(data => setData(data));
    }, []);
    return (
        <div>
            <h1>Fetch Data</h1>
            <ul>
                {data.map((item: any) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
}