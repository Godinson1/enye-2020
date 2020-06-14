import gql from 'graphql-tag';


//Schema for retrieving All Search in App
export const GET_PLACES = gql`
    query places {
        places {
            name
            lat
            lng
            icon
            rating
            userRating
            vicinity
            createdAt
        }  
    }
`;

//Schema for retrieving User's Search
export const GET_PLACE = gql`
    query place($id: String) {
        place(id: $id) {
            name
            lat
            lng
            icon
            rating
            userRating
            placeId
            vicinity
            createdAt
        }  
    }
`;