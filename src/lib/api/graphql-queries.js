import {gql} from 'graphql-request'

export const projectsQuery = gql`
    query GetProjects($height: Int!, $width: Int!) {
        projects() {
            image {
                url(
                    transformation: {image: {resize: {fit: clip, height: $height, width: $width}}, document: {output: {format: webp}}}
                )
            }
        }
    }
`