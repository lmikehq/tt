import CountriesList from '@organism/AllCountry';
import React from 'react'

interface pageProps {

}

const page: React.FC<pageProps> = ({}) => {
        return (
          <div>
            <CountriesList />
          </div>
        );
}
export default page