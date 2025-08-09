# Done
## Frontend
1. Feature based architecture
    1. Shared components, hooks, services
    1. Feature based components, hooks, services
1. Use Ant Design
    1. Solace uses a design system that's built ontop of ant design 
1. Paging state
    1. When you have a large amount of data, you can't just pull all the data at once
1. Use react query
    1. Provides us with a lot more than fetch
1. Error handling

## Backend
1. Page data
1. Separated specialities into a new table from advocates
    1. At some point we would want to filter advocates by specialties


# TODO:
## Product features
1. Filter results
    1. Search being a all fields search might not be a good idea
        1. Select field to search
    1. Turn search into a multi-criteria filter
    1. Example use cases: 
        1. Filter by City
        1. Filter by Specialties
1. Sort columns
    1. Example use cases: 
        1. Sort by degree
        1. Sort by YoE

## Frontend
1. Unit test
1. Accessibility
1. Storing search state in url

## Backend
1. API versioning
1. Error handling
1. Documentation
1. Testing
1. Connection pooling, (looks like it's already handled by the library)