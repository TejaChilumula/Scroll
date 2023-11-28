import React from 'react';
import { useState } from 'react';
import axios from 'axios';
//import styles from './MagicText.module.css';
/*
interface MagicTextprops {
    isOpen: boolean;
    onClose: () => void;
  }



const MagicText: React.FC<MagicTextprops> = ({ isOpen, onClose }) => {


  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [inputData, setInputData] = useState('');

    
  var answer = '';

  const handleinputData = (e) => {
    setInputData(e.target.value);

    console.log(inputData);
  }

  const fetchData = async (e : any) => {
    e.preventDefault();
    setLoading(true);
    try {

      const requestBody = {
        question: inputData,
        // Add more fields as needed
      };

      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          // Other headers if needed
        },
      };

      const res = await axios.post('http://127.0.0.1:5000/ask', requestBody, axiosConfig);

      setResponse(res.data);

      console.log("Bunty GPT working",res.data);

      
      // Store the response in local state
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors
    }
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    await fetchData(e);
  };

      return (
        <>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-overlay">
              <div className="bg-white p-8 max-w-md w-full rounded-lg relative">
              <form onSubmit={fetchData}>
              <button
                  className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  onClick={onClose}
                >
                  {/* Close Icon or SVG }
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
            <div className="h-48 overflow-y-scroll mb-4">
              
              <textarea
                className="w-full h-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Textarea"
                defaultValue={response || ''}
                
              ></textarea>
            </div>
            <div className="mb-4">
              {/* Input 2 }
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="input2">
                Input 2
              </label>
              <input
                value={inputData}
                onChange={handleinputData}
                className="
                w-full 
                px-3 
                py-2 
                border rounded-md 
                text-gray-700 
                leading-tight 
                focus:outline-none 
                focus:ring 
                focus:border-blue-500"
                id="input2"
                type="text"
                placeholder="Input 2"
              />
            </div>
            <div className="flex justify-end">
              <button
                onSubmit={handleSubmit}
                className="
                px-4 
                py-2 
                bg-blue-500 
                text-white 
                rounded-md 
                hover:bg-orange-600 
                focus:outline-none 
                focus:bg-orange-600"
                type="submit"
              >
                {loading ? 'Loading...' : 'Submit'} {/* Show 'Loading...' when loading }
              </button>
            </div>
            </form>
                
          </div>
        </div>
          )}
        </>
);
    }
    
export default MagicText;
*/

// components/MagicText.tsx


interface MagicTextProps {
  isOpen: boolean;
  onClose: () => void;
}

const MagicText: React.FC<MagicTextProps> = ({ isOpen, onClose }) => {

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [inputData, setInputData] = useState('');
  
  let content =  '';

  const handleInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestBody = {
        question: inputData,
        // Add more fields as needed
      };

      const res = await axios.post('/api/ask', requestBody);


      const dataa = res.data;

      //const parsedResponse = JSON.parse(response!);
      content = dataa.response.content;

      setResponse(dataa.response.content);
      

      console.log("GPT working", res.data);
      console.log("This is content : ",content)
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-overlay">
          <div className="bg-white p-8 max-w-md w-full rounded-lg relative">
            <form onSubmit={handleSubmit}>
              {/* Your other elements */}
              <div className="mb-4">
                <input
                  value={inputData}
                  onChange={handleInputData}
                  /* Rest of your input fields */
                />
              </div>
              <div className="h-48 overflow-y-scroll mb-4">
              
              <textarea
                className="w-full h-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Textarea"
                readOnly
                defaultValue={response}
                
              ></textarea>
            </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                  type="submit"
                >
                  {loading ? 'Loading...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MagicText;

