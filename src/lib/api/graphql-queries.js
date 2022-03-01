import {gql} from 'graphql-request'

export const projectsQuery = gql`
    query GetProjects($height: Int!, $width: Int!) {
        projects {
            image {
                url(
                    transformation: {image: {resize: {fit: clip, height: $height, width: $width}}, document: {output: {format: webp}}}
                )
            }
            slug
            name
        }
    }
`

export const projectQuery = gql`
    query GetProject($height: Int!, $width: Int!, $slug: String!) {
        project(where: {slug: $slug}) {
            name
            slug
            description
            demo
            sourceCode
            image {
                url(
                    transformation: {image: {resize: {fit: clip, height: $height, width: $width}}, document: {output: {format: webp}}}
                )
            }
        }
    }
`