//--------------------------------- TP2 BASE DE DATOS 2 ---------------------------------------//
//--------------------------------- Prof: Tomas De Amos ---------------------------------------//
//---------------------------DIEGO DI STEFANO - LEGAJO N° 25764 -------------------------------//
//----Fecha de Entrega: 22/06/2022 ------------------------------------------------------------//

//Punto 1)
/*Recuperar informacion de la tabla de sales
a. Filtrar las storeLocation de "London"
b. Mostrar los siguientes datos:
* saleDate
* items
* storeLocation
* customer
* purchaseMethod
c. Ocultar el campo _id
d. Ordenar en forma ascendente por fecha de venta*/

db.sales.find({storeLocation: "London"},{saleDate:1, items:1, storeLocation:1, customer:1, purchaseMethod:1, _id:0}).sort({saleDate:1})


//***********---------------------------------------------------------------------------****************//
//Punto 2)
/*Recuperar informacion de la tabla de sales
a. Filtrar las storeLocation de "New York", "Austin" y "Denver"
b. Filtrar registros completos que contengan los items de "binder" o "pens" para toda la compra.
c. Mostrar los siguientes datos:
* saleDate
* items
* storeLocation
* customer
* purchaseMethod
d. Ocultar el campo _id
e. Ordenar en forma ascendente por fecha de venta*/

db.sales.find({ 
				$and:	[
							{
								items: { $elemMatch: {$or:[{name: "binder"},{name: "pens"}]} } 
							},
							{
								storeLocation: {$in: ["New York", "Austin", "Denver"]}
							}
						]
			},
			{
				saleDate:1, items: 1, storeLocation:1, customer:1, purchaseMethod:1, _id:0
			})
		.sort({saleDate:1});


//***********---------------------------------------------------------------------------****************//
//Punto 3)
/*Recuperar informacion de la tabla de sales
a. Filtrar customer
* En un rango de 30 a 40 años
* Que hayan indicado en la "satisfaction", un puntaje mayor o igual a 3
* De sexo masculino
NOTA: Para filtrar atributos de objetos, se debe usar la sintaxis "objecto.atributo"
b. Que hayan usado cupones de descuento.
c. Mostrar los siguientes datos:
* saleDate
* items (solo los atributos "name" y "tags")
* storeLocation
* customer
* purchaseMethod
* couponUsed
d. Ocultar el campo _id
e. Ordenar en forma descendente por fecha de venta*/

db.sales.find({
                $and:
                        [
                            {
                                $and: [{ "customer.age":{ $gte: 30 }},{"customer.age":{ $lte: 40 }} ]
                            },
                            {
                                "customer.satisfaction": { $gte: 3 }
                            },
                            {
                                "customer.gender": "M" 
                            },
                            {
                                couponUsed: true
                            }
                        ]
            },
            {
                saleDate:1,
                items: { name: 1, tags: 1 },
                storeLocation:1,
                customer:1,
                purchaseMethod: 1,
                couponUsed: 1,
                _id:0
            }
            ).sort({ saleDate: -1}).pretty();


//***********---------------------------------------------------------------------------****************//
//Punto 4)
/*Recuperar informacion de la tabla de sales.
a. Filtrar las ciudades de Denver o New York.
b. Recuperar solo las 10 ventas mas antiguas.
c. Mostrar los siguientes datos:
* saleDate
* items (solo los atributos "name" y "tags")
* storeLocation
* customer
* purchaseMethod
* couponUsed
d. Ocultar el campo _id*/


db.sales.find({storeLocation: {$in: ["Denver","New York"]}}, {
                saleDate:1,
                items: { name: 1, tags: 1 },
                storeLocation:1,
                customer:1,
                purchaseMethod: 1,
                couponUsed: 1,
                _id:0
            }).sort({ saleDate: 1}).limit(10);


//***********---------------------------------------------------------------------------****************//
//Punto 5)
/*Recuperar informacion de la tabla de sales.
a. Filtrar las ciudades de London o Seattle.
b. Filtrar registros completos que NO contengan items de "pens" para la compra.
c. Filtrar a compradores hombres.
d. Mostrar los siguientes datos:
* saleDate
* items (solo los atributos "name" y "tags")
* storeLocation
* customer
* purchaseMethod
* couponUsed
e. Ocultar el campo _id
f. Ordenar por satisfaccion del cliente en forma ascenciente*/


db.sales.find({
                $and:
                        [
                            {
                                storeLocation: {$in: ["London","Seattle"]}
                            },
                            {
                                "items.name": {$ne: "pens"}
                            },
                            {
                                "customer.gender": "M" 
                            }
                        ]
                    },
                    {
                        saleDate:1,
                        items: { name: 1, tags: 1 },
                        storeLocation:1,
                        customer:1,
                        purchaseMethod: 1,
                        couponUsed: 1,
                        _id:0
                    }
                    ).sort({"customer.satisfaction": 1}).pretty();