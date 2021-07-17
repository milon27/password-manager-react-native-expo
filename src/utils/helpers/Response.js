const Response = (success, title, desc, type, object = {}) => {
    return { success: success, title: title, desc: desc, type: type, object: object }
}//Response(false/true, "message title" , "message description", "danger-bootstrap color")
export default Response;