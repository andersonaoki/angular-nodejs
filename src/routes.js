const { Router } = require("express");
const crypto = require("crypto");
const router = Router();

const clients = [];

router.get('/api/client', (req,res) => {
    try {
        return res.json(clients);
    } catch (error) {
        return res.status(400).send({error: 'Não foi possivel recuperar a lista de clientes'});
    }
   
});

router.post('/api/clientId', (req, res) => {
    const client = req.body.id;
    try {
        const id = client.id;
        const item = clients.find(item => item.id == id); 
    
        if(!item) return res.status(400).send({ error: 'Id do cliente não encontrado'});
        console.log(item);
        return res.json({item});
    } catch (error) {
        return res.status(400).send({ error: 'Busca por cliente não encotrado!' });
    }
});

router.post('/api/client', (req, res) => {
    const client = req.body.client;

    try {
        client.id = crypto.randomInt(5010, 8999);
        
        clients.push(client);
        return res.json(clients);

    } catch (error) {
        return res.status(400).send({ error: 'Error ao cadastrar Cliente!' });
    }

   
});

module.exports = router;