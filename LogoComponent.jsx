import axios from 'axios';
import { parse } from 'node-html-parser';
import React, { useEffect, useState } from 'react';
import GoogleLogo from './GoogleLogo.jfif'

const fetchWebpage = async (url) => {
  try {
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching webpage:', error);
    return null;
  }
};



const extractLogoUrl = (htmlContent) => {
  if (!htmlContent) {
    console.error('HTML content is null or undefined.');
    return null;
  }

  const root = parse(htmlContent);
  const logoElement = root.querySelector('img'); // Adjust this selector according to the webpage's structure
  if (logoElement) {
    return logoElement.getAttribute('src');
  }
  return null;
};


const Google = ({ webpageUrl, description }) => {
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const fetchLogo = async () => {
      const htmlContent = await fetchWebpage(webpageUrl);
      // {console.log(htmlContent)}
      const logoUrl = extractLogoUrl(htmlContent);
      // {console.log(logoUrl)}
      if (logoUrl) {
        setLogoUrl(logoUrl);
      }
    };

    fetchLogo();
  }, [webpageUrl]);

  return (
      // <div className='GithubFrame'>
      //   <a href={webpageUrl} target="_blank" rel="noopener noreferrer">
      //     {logoUrl ? (
      //       <img src={logoUrl} alt="Logo" />
      //     ) : (
      //       <img src={GoogleLogo} alt="Logo" />
      //       // <p>Logo not found for the given webpage URL.</p>
      //     )}
      //   </a>
      //   <p>{description}</p>
      // </div>
      <div >
      <div className='sourceBox' style={{backgroundColor:"orange", marginRight:"10px"}}>
          <div className="sourceBoxTitle">
            {/* <h3>{name} References</h3> */}
            <p>{description}</p>
          </div>
          <div className='sourceBoxInfo'>
            {/* <a href={webpageUrl}><button className='sourceBoxButton'>Url</button></a> */}
            <button className='sourceBoxButton' onClick={() => window.location.href = webpageUrl}>Visit URL</button>


            {logoUrl ? (
              <img src={logoUrl} alt="Logo" height="50px" width="70px" />
            ) : (
              <img src={GoogleLogo} alt="Logo" height="50px" width="70px" />
              // <p>Logo not found for the given webpage URL.</p>
            )}
            {/* <img src= {logos[type]} alt="Logo" height="50px" width="70px" /> */}
          </div>
          
        </div>
        </div>
  );
};

// function Google({link, description}){
//   return(
//     <div>
//       <div className='GithubFrame'>
//         <a href={link} target="_blank" rel="noopener noreferrer">
//           {logoUrl ? (
//             <img src={logoUrl} alt="Logo" />
//           ) : (
//             <p>Logo not found for the given webpage URL.</p>
//           )}
//         </a>
//         <p>{description}</p>
//       </div>
//     </div>
//   )
// }


export default Google;
