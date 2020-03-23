const IsObject = (a: any) => {
	return !!a && a.constructor === Object;
};

export default IsObject;
