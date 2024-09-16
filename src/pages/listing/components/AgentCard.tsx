import {Agent} from "../../../types/agents.ts";
import agentStyles from '../styles/listingpage.agent.module.css'
import PhoneSVG from '/src-icons/listing/phone.svg'
import EmailSVG from '/src-icons/listing/email.svg'

export default function AgentCard({agent}:{agent: Agent}){


    return <div className={agentStyles['agentCardWrapper']}>
        <div className={agentStyles['agentDetails']}>
            <img src={String(agent.avatar)}  alt="Agent picture"/>

            <div>
                <h5>{agent.name} {agent.surname}</h5>
                <p>აგენტი</p>
            </div>
        </div>

        <div className={agentStyles['contactDetails']}>
            <div>
                <img src={EmailSVG} alt={'Email icon'} />
                <p>{agent.email}</p>
            </div>
            <div>
                <img src={PhoneSVG} alt={'Phone icon'}/>
                <p>{agent.phone.substring(0,3).concat(` ${agent.phone.substring(3, 6)}`).concat(` ${agent.phone.substring(6, 9)}`)}</p>
            </div>
        </div>
    </div>
}