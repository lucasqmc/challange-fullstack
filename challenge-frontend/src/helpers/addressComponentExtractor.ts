
export const addressComponentExtractor = (resultJson:any,componentName:any) => {
    const object = resultJson.address_components.find(
        (c: any) => c.types.includes(componentName)
    )
    return object ? object.long_name : 'Não definido'        
}