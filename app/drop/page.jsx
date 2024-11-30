"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';



export default function DeleteCollection() {
    const [collectionName, setCollectionName] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = confirm("ARE YOU SURE YOU WANT TO DELETE ALL DATA?")
        if(confirmed){
            if (!collectionName) {
                setMessage('Please enter a collection name');
                return;
            }
            try {
                const response = await fetch(`/api/drop?name=${collectionName}`, {
                    method: 'DELETE',
                });
    
                const data = await response.json();
                if (response.ok) {
                    setMessage(data.message);
                    router.refresh()
                    router.replace("/")
                    alert("All Data Deleted!")
                } else {
                    setMessage(data.error || data.message);
                }
            } catch (error) {
                console.error('An error occurred:', error);
                setMessage('An error occurred while deleting the collection');
            }
        }


    };

    return (
        <div className='min-h-[100dvh] w-full flex flex-col gap-5 justify-start items-center p-10 bg-[#09090B]'>
            <h1 className='font-semibold text-lg text-white'>Please contact the Database owner for the Collection name</h1>
            <Input
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="Enter Collection Name"
                style={{ marginRight: '10px' }}
                 className='px-4 py-6 rounded-lg border-2 border-zinc-300 text-white w-full sm:w-[300px]'
            />
            <Button className='px-4 py-2 rounded-lg bg-red-500 text-white' onClick={handleDelete}>Delete Collection</Button>
            {message && <p className='font-medium text-gray-500'>{message}</p>}
        </div>
    );
}
