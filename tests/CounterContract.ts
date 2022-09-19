import * as anchor from "@project-serum/anchor";
import {Program} from "@project-serum/anchor";
import {CounterContract} from "../target/types/counter_contract";
import {assert} from "chai";

describe("CounterContract", () => {
    // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.CounterContract as Program<CounterContract>;

    const counterAccount = anchor.web3.Keypair.generate();
    it("Is initialized!", async () => {
        // Add your test here.

        // signers adds the provider.wallet as a default signer in the array
        const tx = await program.methods.initialize().accounts({
            counterAccount: counterAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId
        }).signers([counterAccount]).rpc();

        const createdCounter = await program.account.counterAccount.fetch(counterAccount.publicKey);
        assert.strictEqual(createdCounter.count.toNumber(), 0)
        console.log("Your transaction signature", tx);
    });

    it("Increment the counter!", async () => {

      const tx = await program.methods.increment().accounts({
        counterAccount: counterAccount.publicKey
      }).rpc();

      const incrementedCounter = await program.account.counterAccount.fetch(counterAccount.publicKey);
      assert.strictEqual(incrementedCounter.count.toNumber(), 1);
    });

    it("Decrement the counter!", async () => {

      const tx = await program.methods.decrement().accounts({
        counterAccount: counterAccount.publicKey
      }).rpc();

      const decrementedCounter = await program.account.counterAccount.fetch(counterAccount.publicKey);
      assert.strictEqual(decrementedCounter.count.toNumber(), 0);
    })
});
