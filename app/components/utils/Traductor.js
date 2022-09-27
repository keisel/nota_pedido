import moment from 'moment';
import 'moment/locale/es';
//moment().format('YYYY-MM-DD')
const documento = (connectionId,number,id_company, id_currencie, id_payment, arrayItems, user, dominio)=>{
    let taxes=[]
    let total_exempt=0
    let total_affect=0
    let total_taxes=0
    let detail=[]
    for(let item of arrayItems){
        if(item.qty>0){
            detail.push({
                "alerted": false,
                "focus": false,
                "id": 0,
                "id_origin": 0,
                "id_document": 0,
                "id_warehouse_origin": 0,
                "id_warehouse_destiny": 0,
                "id_item": item.id,
                "id_costcenter": 0,
                "id_labor": 0,
                "id_unit": item.unit,
                "id_doc_det_ref": 0,
                "lot": "",
                "origin": "",
                "item_text": "",
                "date_charge": "2022-08-17",
                "total_mp": item.price*item.qty,
                "total_md": item.price*item.qty,
                "discounts_mp": 0,
                "discounts_md": 0,
                "net_total_mp": 0,
                "net_total_md": 0,
                "cost_mp": item.price,
                "cost_md": item.price,
                "total": item.price*item.qty,
                "amortization_periods": 0,
                "inventory": false,
                "intern": false,
                "costing": false,
                "quantity": item.qty,
                "value_ppp": item.price,
                "origin_warehouse_quantity": 0,
                "type": ""
              })
            // buscamos los impuestos del item
            if(item.taxes.length>0){
                // sumamos el monto afecto
                let amount=item.price*item.qty
                total_affect=total_affect+amount

                // recorremos el array de impuesto del item puede tener mas de uno
                for(let impuesto of item.taxes){

                    // vemos si el array de impuestos ya tiene este impuesto agregado
                    if(taxes.length>0){
                        let index= taxes.findIndex(tax => tax.id_taxes == impuesto.tax_id)
                        if (index > -1) {
                            let tax=taxes[index]
                            let amount=item.price*item.qty
                            let amountTax= amount*impuesto.value/100
                            tax.value_mp=tax.value_mp+amountTax
                            tax.value_md=tax.value_md+amountTax
                        }else{
                            // si no lo tiene lo agregamos
                            let amount=item.price*item.qty
                            let amountTax= amount*impuesto.value/100
                            taxes.push(
                                { 
                                    "id": 0,
                                    "id_document": 0,
                                    "id_taxes": impuesto.tax_id,
                                    "value_mp":amountTax,
                                    "value_md": amountTax
                                }
                            )

                        }  
                    }else{
                        // si no lo tiene lo agregamos
                        let amount=item.price*item.qty
                        let amountTax= amount*impuesto.value/100
                        taxes.push(
                            { 
                                "id": 0,
                                "id_document": 0,
                                "id_taxes": impuesto.tax_id,
                                "value_mp":amountTax,
                                "value_md": amountTax
                            }
                        )

                    }
                }
            }else{
                // estos son los item excentos de impuestos
                let amount=item.price*item.qty
                total_exempt=total_exempt+amount
            }
        }
    }

    for(let tax of taxes){
        total_taxes=total_taxes+tax.value_md
    }

    let documento={
        "element": {
            "id": 0,
            "number": number,
            "state": "",
            "key": "",
            "origin": "",
            "reference": "",
            "truck_patent": "",
            "trailer_patent": "",
            "document_type": "NVNV",
            "document_subtype": "",
            "id_origin": 0,
            "id_company": id_company,
            "id_transmitter": id_company,
            "id_receiver": id_company,
            "id_creator": `${user.id}`,
            "id_buyer": 0,
            "id_applicant": 0,
            "id_currency": id_currencie,
            "id_payment": id_payment,
            "id_tax_codes": 0,
            "id_carrier": 0,
            "id_doc_state": 1,
            "tax_number": 0,
            "tax_month": 0,
            "tax_year": 0,
            "tax_adjustment": false,
            "linkable": true,
            "billable": true,
            "approved": false,
            "referencial_currency": false,
            "date_registry": "2022-08-17",
            "date_emission": "2022-08-17",
            "date_expiration": "2022-08-17",
            "date_delivery": "2022-08-17",
            "date_transmission": "2022-08-17",
            "exchange_rate": 1,
            "total_detail_mp": total_affect+total_exempt,
            "discounts_mp": 0,
            "net_affection_mp": total_affect,
            "net_exempt_mp": total_exempt,
            "taxes_mp": total_taxes,
            "retentions_mp": 0,
            "total_detail_md": total_affect+total_exempt,
            "discounts_md": 0,
            "net_affection_md": total_affect,
            "net_exempt_md": total_exempt,
            "taxes_md": total_taxes,
            "retentions_md": 0,
            "cp_1": "",
            "cp_2": "",
            "cp_3": "",
            "cp_4": "",
            "cp_5": "",
            "cp_6": "",
            "notes": ""
        },
        "elements":detail,
        "taxes":taxes,
        "accounts": [],
        "user": `${user.id}`,
        "username": `${user.nombre_usuario}`,
        "company": `${id_company}`,
        "connectionId": `${connectionId}`,
        "app": "FX10",
        "platform": "web",
        "domain":`${dominio}`
    }
    return documento
}

export {documento}


  /* let element={
            id:0,
            number:1,
            state:'',	
            key:'',	
            origin	:'',	
            reference	:'',	
            truck_patent	:'',	
            trailer_patent	:	'',
            document_type	:	'NVNV',
            document_subtype	:'',	
            id_origin	:	0,
            id_company	:	1, //esto lo tengo
            id_transmitter	:1,  // esto es el mismo
            id_receiver	:	1,  /// supongo que esto tambien
            id_creator	:	6,  // puede ser id del usuario
            id_buyer	:	0,
            id_applicant	:	0,
            id_currency	:	1,  // este lo tengo
            id_payment	:	1,   // este tambien pero creo que siempre es 1
            id_tax_codes	:0,
            id_carrier	:	0,
            id_doc_state	:1,
            tax_number	:	0,
            tax_month	:	0,
            tax_year	:	0,
            tax_adjustment	:	false,
            linkable	:	true, // este lo tengo en el tab
            billable	:	true, // este tambien
            approved	:	false,
            referencial_currency	:false,
            date_registry	:	2022-08-17, // la de hoy
            date_emission	:	2022-08-17, // la de hoy
            date_expiration	:	2022-08-17, // la de hoy
            date_delivery	:	2022-08-17, // la de hoy
            date_transmission	:2022-08-17, // la de hoy
            exchange_rate	:	1,
            total_detail_mp	:	42162,  // suma de net_affection_mp + net_exempt_mp
            discounts_mp	:	0,
            net_affection_mp	:	36910, // suma de todos los item afectos
            net_exempt_mp	:	5252,  // suma de todos los item excentos 
            taxes_mp	:	11442,  // suma de todos los taxes cualquier id
            retentions_mp	:	0,
            total_detail_md	:	42162,  // igual que total_detail_mp 
            discounts_md	:	0,
            net_affection_md	:	36910, // igual que net_affection_mp
            net_exempt_md	:	5252,  // igual que net_exempt_mp
            taxes_md	:	11442.099999999999, // igual que taxes_mp
            retentions_md	:	0,
            cp_1	:	'',
            cp_2	:	'',
            cp_3	:	'',
            cp_4	:	'',
            cp_5	:	'',
            cp_6	:	'',
            notes	:	'',
        }

        let elements=[{
            alerted	:	false,
            focus	:	false,
            id	:	0,
            id_origin	:	0,
            id_document	:	0,
            id_warehouse_origin	:	3,
            id_warehouse_destiny	:	0, 
            id_item	:	19,  // lo tengo
            id_costcenter	:	0,
            id_labor	:	0,
            id_unit	:	2, // lo tengo
            id_doc_det_ref	:	0,
            lot	:	0,
            origin	:	0,
            item_text	:	0,
            date_charge	:	2022-08-17,
            total_mp	:	5000,
            total_md	:	5000,
            discounts_mp	:	0,
            discounts_md	:	0,
            net_total_mp	:	0,
            net_total_md	:	0,
            cost_mp	:	500,
            cost_md	:	500,
            total	:	5000,
            amortization_periods	:	0,
            inventory	:	false,
            intern	:	false,
            costing	:	false,
            quantity	:	10,
            value_ppp	:	500,
            origin_warehouse_quantity	:	980,
            type	:	'',

        }]
        let data={
            user:usuario.id,   
            username:usuario.nombre_usuario,
            company	:company,
            connectionId:108,
            app:'FX10',
            platform:'web'

        }
        let accounts=[]
        let taxes=[
            {
                id:0,
                id_document:0,
                id_taxes:1,
                value_mp:1881,
                value_md:1881,

            }
        ]*/