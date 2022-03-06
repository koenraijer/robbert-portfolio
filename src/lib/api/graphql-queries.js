import {gql} from 'graphql-request'

export const projectsQuery = gql`
    query GetProjects($sm: Int!, $md: Int!, $lg: Int!, $xl: Int!) {
        projects {
            image {
                sm: url(
                    transformation: {image: {resize: {fit: clip, width: $sm}}, document: {output: {format: webp}}}
                )
                md: url(
                    transformation: {image: {resize: {fit: clip, width: $md}}, document: {output: {format: webp}}}
                )
                lg: url(
                    transformation: {image: {resize: {fit: clip, width: $lg}}, document: {output: {format: webp}}}
                )
                xl: url(
                    transformation: {image: {resize: {fit: clip, width: $xl}}, document: {output: {format: webp}}}
                )
                xxl: url(
                    transformation: {document: {output: {format: webp}}}
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