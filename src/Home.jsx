import React, { useEffect, useState } from 'react'
import './App.css'

const Home = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState([]);
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts');
                const result = await res.json();
                console.log(result);
                setDatas(result);
                setIsLoading(false);
            } catch (error) {
                console.log("Error fetching data : ", error)
            }
        };
        fetchData();
    },[]);

    // Add or Save data
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === "" || body.trim() === "") return alert("Title and Body can't be empty !!");

        if (editId) {
            // console.log(editId);
            const updatedData = datas.map( (data) => data.id === editId ? {...data, title, body} : data);

            setDatas(updatedData);
            setEditId(null);
            setEdit(false);
            setTitle('');
            setBody('');
            console.log("Successfully updated");
            return;
        }
        else {
            const newNote = {
                id : datas.length +1,
                title,
                body
            };

            setDatas([newNote, ...datas]);
            setBody('');
            setTitle('');
            setEdit(false);
        }
    };

    // Edit data
    const handleEdit = (id) => {
        const editData =  datas.find(data =>  data.id === id)
        setEdit(true);
        setEditId(editData.id);
        setTitle(editData.title);
        setBody(editData.body);
        // console.log(editData);
    };

    // Delete data
    const handleDelete = (id) => {
        const newData =  datas.filter( (data) => data.id !== id );
        setDatas(newData);
        console.log("Deleted ID : ",id);
    };

  return (
    <>
        <div className='min-h-screen pt-10 mx-auto bg-gray-950 text-white'>
            <div className="flex flex-col justify-center items-center">
                <header className='text-3xl font-bold underline underline-offset-10'>CRUD Operation Using React</header>

                {/* Add new notes button */}
                <div className="my-10 flex justify-between gap-60">
                    <div></div>
                    <div>
                        <button 
                            className=' bg-blue-600 px-5 py-2 rounded cursor-pointer  hover:bg-blue-700 transition-all duration-300'
                            onClick={() => setEdit(true)}
                        >
                            Add New Note
                        </button>
                    </div>
                </div>

                {/* Data fetching */}
                <div className="my-10">
                    {isLoading ? 
                    (<p className='text-2xl font-bold'>Loading...</p>) :

                    ( <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
                        {datas.map((data) => (
                            <div className="mb-8" key={data.id}> 
                                <div className='px-5 py-4 rounded-xl border border-blue-900 cursor-pointer'>
                                    <h1 className='text-xl mb-1'>{data.title}</h1>
                                    <hr className='mb-4'/>
                                    <p className='mb-3 text-gray-500'>{data.body}</p>
                                    <div className="flex gap-5 px-5">
                                        <button className='bg-[#034aa6] px-6 py-1 rounded cursor-pointer hover:bg-[#0367a6]'
                                                onClick={ () => handleEdit(data.id) }
                                        >
                                            Edit
                                        </button>
                                        <button className='bg-[#590202] px-6 py-1 rounded cursor-pointer hover:bg-[#8c031c]'
                                                onClick={ () => handleDelete(data.id) }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </div>
        {/* Add new notes  */}
        {edit ? 
            (<div className='bg-sky-500/30 min-w-screen h-full top-0 fixed'>
                <div className='w-[800px] h-[600px] bg-white relative top-1/4 left-1/4 rounded-2xl'>

                    <button 
                      className="absolute top-4 right-4 text-gray-800 hover:text-red-500 text-xl font-bold"
                      onClick={() => {
                        setEdit(false);
                        setEditId(null);
                        setTitle('');
                        setBody('');
                      }}
                    >
                      &times;
                    </button>


                    {/* Heading */}
                    <header className='text-3xl font-bold flex justify-center items-center py-4'>
                        {editId ? "Edit Notes" : "Add New notes"} 
                    </header>
                    <hr className='mb-10 w-[450px] relative left-1/4'/>

                    <form onSubmit={handleSubmit} className='flex flex-col'>

                        {/* Title section */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 relative left-1/4">
                            <div className="sm:col-span-3">
                                <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">Title</label>
                                 <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                                        <input 
                                            type="text" 
                                            name="title" 
                                            id="title" 
                                            value={title} 
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"  
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* About section */}
                        <div className="relative left-1/4">
                          <label htmlFor="bodycontent" className="block text-sm/6 font-medium text-gray-900">Body Content</label>
                          <div className="mt-2">
                            <textarea 
                                name="bodycontent" 
                                id="bodycontent" 
                                value={body}
                                onChange={(e) => setBody(e.target.value)} 
                                rows="3" 
                                className="block w-1/2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                            </textarea>
                          </div>
                          <p className="mt-3 text-sm/6 text-gray-600">
                            Write a few sentences about your content.
                        </p>
                        </div>

                        {/* Submit button */}
                        <button className='mt-10 w-1/2 bg-[#206a73] py-2 rounded text-white cursor-pointer relative left-1/4 hover:bg-[#324e59]'>Submit</button>

                    </form>

                </div>
            </div>) : ""
        }
    </>
  )
}


export default Home;