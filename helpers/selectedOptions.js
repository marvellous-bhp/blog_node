function selectedOptions(nameSchema, nameOptions){
    let allowedStatusValues = nameSchema.describe().keys.nameOptions.valids;

    let selectElement = document.createElement('select');

    allowedStatusValues.forEach(value => {
    let optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = value;
    selectElement.appendChild(optionElement);
    });

    document.body.appendChild(selectElement);
    }