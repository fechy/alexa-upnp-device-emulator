const eventServiceXML = () => (
    `<scpd xmlns="urn:Belkin:service-1-0">
        <actionList>
            <action>
            <name>SetBinaryState</name>
            <argumentList>
                <argument>
                <retval/>
                <name>BinaryState</name>
                <relatedStateVariable>BinaryState</relatedStateVariable>
                <direction>in</direction>
                </argument>
            </argumentList>
            </action>
        </actionList>
        <serviceStateTable>
            <stateVariable sendEvents="yes">
                <name>BinaryState</name>
                <dataType>Boolean</dataType>
                <defaultValue>0</defaultValue>
            </stateVariable>
                <stateVariable sendEvents="yes">
                <name>level</name>
                <dataType>string</dataType>
                <defaultValue>0</defaultValue>
            </stateVariable>
        </serviceStateTable>
    </scpd>
`
);

module.exports = eventServiceXML;