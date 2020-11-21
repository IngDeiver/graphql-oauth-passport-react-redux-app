import {useState, useEffect} from 'react'


export const useForm = ({initialValues}) => {

    useEffect(() => {}, [initialValues])
    
    const [fields, setFields] = useState(initialValues)

    const onChange = (e) => {
        const {name, value, type, checked} = e.target
        setFields({...fields, [name]: type == 'checkbox' ? checked : value})
    }

    const addField = (name, value) => {
        setFields({...fields, [name]:value})
    }

    const removeField = (name) => {
        const newFields = {...fields}
        delete newFields[name]
        setFields({...newFields})
    }

    return  {
        fields,
        addField,
        removeField,
        getInput: (name) => ({name, value:fields[name], onChange}),
        getCheckbox: (name) => ({name, checked:fields[name], onChange}),
        getRadio: (name, value) => ({name, value, checked:fields[name] === value, onChange}),
        getSelect: (name) => ({name, value:fields[name], onChange})
    }
}