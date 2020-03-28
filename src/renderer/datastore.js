import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const db={
    bankData: new Datastore({filename: path.join(remote.app.getPath('userData'), '/bankData.db')}),
    registerData: new Datastore({filename: path.join(remote.app.getPath('userData'), '/registerData.db')}),
}

export default{
    db
}